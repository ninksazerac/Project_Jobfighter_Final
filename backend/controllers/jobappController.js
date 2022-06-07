const asyncHandler = require("express-async-handler");


const postSchema = require("../models/postModel");
const appSchema = require("../models/jobappModel");

// @desc    Set post
// @route   POST /posts
// @access  Private
const SubmitJob = asyncHandler(async (req, res) => {
  const post = await postSchema.findById({ _id: req.body.postid });
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  try {
  const jobApp = await appSchema.create({
    user: req.user.id,
    post: req.body.postid,
    company: req.body.companyid,
    status: 'wait',
    resume : req.body.resume
  });

  console.log('job submited')
  res.status(200).json(jobApp);
} catch (err) {
  console.log(err);
  res.status(500).send("Server getSubmited Error!");
}
});

// @desc    Student get all job application
// @route   GET /
// @access  Private
const getSubmited = asyncHandler(async (req, res) => {
  try {
    const jobapps = await appSchema
    .find({ user: req.user.id })
    .populate('post')
    .populate("company")

    console.log('jobapps',jobapps)
    res.status(200).json(jobapps);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server getSubmited Error!");
  }
 
});

const SearchOne = asyncHandler(async (req, res) => {
  console.log('req.user.id :',req.user.id)
  console.log('req.params.id :',req.params.id)
  const post = await appSchema.findOne({'user':req.user.id}).where({'post':req.params.id}).exec()
  console.log(post)
  res.json(post)

  })


// @desc  Company
const getApp = asyncHandler(async (req, res) => {
  const jobapps = await appSchema
    .find({ company: req.user.id })
    .populate("post")
    .populate("user");
    

  res.status(200).json(jobapps);
});



const changeStatus = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const jobApp = await appSchema.findById({ _id: req.body.id });
    if (!jobApp) {
      res.status(400);
      throw new Error("Application not found");
    }

    const changedStatus = await appSchema.findByIdAndUpdate(
      { _id: req.body.id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(changedStatus);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});


module.exports = {
  SubmitJob,
  getSubmited,
  SearchOne,
  getApp,
  changeStatus
};
