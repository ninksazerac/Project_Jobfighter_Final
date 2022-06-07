const asyncHandler = require("express-async-handler");

const postSchema = require("../models/postModel");

// @desc    Get posts
// @route   GET /posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
 
  const posts = await postSchema.find().populate('user')   // find() จะแสดงโพสทั้งหมด => ใส่ user.id 
                                                               //  => แสดงโพสทั้งหมดที่เป็นของ user id นั้นๆ
  res.status(200).json(posts)
})




// @desc    Get Company all posts    
// @route   GET /
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {       
  const posts = await postSchema.find({ user: req.user.id }); // find() จะแสดงโพสทั้งหมด => ใส่ user.id 
                                                              //  => แสดงโพสทั้งหมดที่เป็นของ user id นั้นๆ
  res.status(200).json(posts);                                // ใช้ req.user.id ได้เลยเพราะถอดรหัสมาจาก token แล้ว
});


// @desc    User click in post
// @route   GET /
// @access  Public
const currentPost = asyncHandler(async (req, res) => {
  const post = await postSchema.findById( req.params.id );  // find current post & company data 
                                      
  console.log('Current post')
  res.status(200).json(post);
});


// @desc    Set post
// @route   POST /posts
// @access  Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.desc) {
    res.status(400);
    throw new Error("Please add a desc field");
  }
  try{
  const post = await postSchema.create({
    user: req.user.id,
    desc: req.body.desc, 
    benefit: req.body.benefit,
    college: req.body.college,
    faculty: req.body.faculty,
    program: req.body.program,    
    jobType: req.body.jobType,
    position :req.body.position ,
    wageMin: req.body.wageMin,
    wageMax: req.body.wageMax,
    rate: req.body.rate,
    provinceAddress : req.body.provinceAddress ,
    postDateExpire : req.body.postDateExpire,
    postExpireIn : req.body.postExpireIn,
    companyAddress : req.body.companyAddress ,
    boost: req.body.boost, 
    enable : false ,  

    price : 0 ,
    slipimg : '',
    payname :'',
    paydate : '',
    
  });

  console.log("Created post");
  res.status(200).json(post);


} catch (err) {
  console.log(err);
  res.status(500).send("Server Error!");
}
});

// @desc    Update post
// @route   PUT /posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await postSchema.findById( req.params.id );

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await postSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  console.log('Post Updated')
  res.status(200).json(updatedPost);
});

// @desc    Delete
// @route   DELETE /posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await postSchema.findById( req.params.id );

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user 
  // if (post.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  await post.remove();

  console.log("Deleted post");
  res.status(200).json({ id: req.params.id });
});

// @desc    change status post
// @route   POST /posts/change-status
// @access  Private
const changeEnable = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const post = await postSchema.findById(
      { _id: req.body.id },
      // { enabled: req.body.enabled }
    );
    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }

    

    const changedEnable = await postSchema.findByIdAndUpdate(
    
      { _id: req.body.id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(changedEnable);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});


//method put
const payPost = asyncHandler(async (req, res) => {
  console.log('reqdata:::::',req.body)
  const post = await postSchema.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json(post)
})

//method get
const getpayPost = asyncHandler(async (req, res) => {

  console.log(req.params.id)
  const post = await postSchema.findById(req.params.id)
  console.log('post is: ',post) 

  var calPrice = 500 // base prince 
  var boostPrice = 150 
  var totalPrice 
  calPrice = calPrice * post.postExpireIn
  if (post.boost === true ){
    boostPrice = boostPrice * post.postExpireIn
  }
  else {boostPrice = 0}
  totalPrice = boostPrice +calPrice 
  console.log(`${calPrice} ${boostPrice} ${totalPrice}`)

  await postSchema.findByIdAndUpdate(req.params.id, {'price':totalPrice})
  



  res.json({'calPrice':calPrice , 'boostPrice':boostPrice , 'totalPrice' : totalPrice ,'postExpireIn' :  post.postExpireIn })
})


const adgetPost  = asyncHandler(async (req, res) => {
  const post = await postSchema.find({slipimg:{$nin:[null,'']}}).populate('user')
  res.json(post)
})

module.exports = {
  getPosts,
  getUserPosts,
  currentPost,
  setPost,
  updatePost,
  deletePost,

  changeEnable,

  payPost,
  getpayPost,
  adgetPost
};
