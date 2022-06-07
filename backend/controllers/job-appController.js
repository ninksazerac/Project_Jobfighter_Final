const asyncHandler = require("express-async-handler");

const jobAppSchema = require('../models/job-appModel')
const postSchema = require('../models/postModel')
const userSchema = require('../models/userModel')

// @desc    Set post
// @route   POST /posts
// @access  Private
const savejob = asyncHandler(async (req, res) => {
    // const post = await postSchema.findById( req.params.id );   // ใช้งี้ไปก่อน ใช้หาโพสจาก params แล้วเอาไปยัดใส้ jobapp ทีหลัง

    
    const post = await postSchema.findById(
      { _id: req.body.id },
      // { enabled: req.body.enabled }
    );
    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }

    const jobApp = await jobAppSchema.create({
      user: req.user.id,
      post: req.body.id,
      

    });
  
    console.log("Saved job application");
    res.status(200).json(jobApp);
  });


// @desc    Get Company all posts    
// @route   GET /
// @access  Private
const getMyjob = asyncHandler(async (req, res) => {       
    const jobapps = await jobAppSchema.find({ user: req.user.id }).populate('post'); 
    
    // const company = await userSchema.findById(jobapps[0].post.user._id).select('-_id -password -role -createdAt')
    // if (!company) {
    //   res.status(400);
    //   throw new Error("company not found");
    // }

    // const jobAndcom = {
    //   job: jobapps[0].post.desc,
    //   company: company.name
    // };

    // console.log(jobapps[0].post.user._id)
    res.status(200).json(jobapps);                                
  });
  
module.exports = {
    savejob,
    getMyjob,
  };