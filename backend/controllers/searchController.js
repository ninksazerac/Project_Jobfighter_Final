
const asyncHandler = require('express-async-handler')

const postSchema = require('../models/postModel')



const GetSearch = asyncHandler(async (req, res) => {
  try{  
    if(req.body.wageMin >=0 || req.body.wageMax >= 0){
      if (req.body.wageMin >=0 && req.body.wageMax >= 0 ){
        console.log('case1')
        var posts = await postSchema.find(req.body).populate('user')
        .where({'wageMin':{$gte:req.body.wageMin} 
        , 'wageMax':{$lte:req.body.wageMax}})
      }
      else if (req.body.wageMin >=0  ){
        console.log('case2')
        var posts = await postSchema.find(req.body).populate('user')
        .where({'wageMin':{$gte:req.body.wageMin}  })
      }
      else if (req.body.wageMax >= 0 ){
        console.log('case3')
        var posts = await postSchema.find(req.body).populate('user')
        .where({ 'wageMax':{$lte:req.body.wageMax}})
      }
  }
    else{
      var posts = await postSchema.find(req.body).populate('user')
    }
    res.status(200).json(posts)
    console.log(posts)
  }
  catch(err){
      console.log('Getsearch is error!')
    } 
}

)
const GetSearchBoost = asyncHandler(async (req, res) => {
      console.log('req--->',req.body)
      try{  
        if(req.body.wageMin >=0 || req.body.wageMax >= 0){
          if (req.body.wageMin >=0 && req.body.wageMax >= 0 ){
            console.log('case1')
            var posts = await postSchema.find(req.body).where({boost:true}).populate('user')
            .where({'wageMin':{$gte:req.body.wageMin} 
            , 'wageMax':{$lte:req.body.wageMax}})
          }
          else if (req.body.wageMin >=0  ){
            console.log('case2')
            var posts = await postSchema.find(req.body).where({boost:true}).populate('user')
            .where({'wageMin':{$gte:req.body.wageMin}  })
          }
          else if (req.body.wageMax >= 0 ){
            console.log('case3')
            var posts = await postSchema.find(req.body).where({boost:true}).populate('user')
            .where({ 'wageMax':{$lte:req.body.wageMax}})
          }
      }
        else{
          var posts = await postSchema.find(req.body).where({boost:true}).populate('user')
        }
        res.status(200).json(posts)
        console.log(posts)
      }
      catch(err){
          console.log('Getsearch is error!')
        } 
})
const GetSearchNotBoost = asyncHandler(async (req, res) => {
  console.log('req--->',req.body)
  try{  
    if(req.body.wageMin >=0 || req.body.wageMax >= 0){
      if (req.body.wageMin >=0 && req.body.wageMax >= 0 ){
        console.log('case1')
        var posts = await postSchema.find(req.body).where({boost:false}).populate('user')
        .where({'wageMin':{$gte:req.body.wageMin} 
        , 'wageMax':{$lte:req.body.wageMax}})
      }
      else if (req.body.wageMin >=0  ){
        console.log('case2')
        var posts = await postSchema.find(req.body).where({boost:false}).populate('user')
        .where({'wageMin':{$gte:req.body.wageMin}  })
      }
      else if (req.body.wageMax >= 0 ){
        console.log('case3')
        var posts = await postSchema.find(req.body).where({boost:false}).populate('user')
        .where({ 'wageMax':{$lte:req.body.wageMax}})
      }
  }
    else{
      var posts = await postSchema.find(req.body).where({boost:false}).populate('user')
    }
    res.status(200).json(posts)
    console.log(posts)
  }
  catch(err){
      console.log('Getsearch is error!')
    } 
})
// method get
const SelectedPost = asyncHandler(async (req, res) => {
    var post = await postSchema.findById(req.params.id).populate('user')
    res.status(200).json(post)
})

const SubmitJob = asyncHandler(async (req, res) => {
  var post = await postSchema.findById(req.params.id ).populate('user')
  console.log(post.user.id) 

  var post2 = await postSchema.findByIdAndUpdate(req.params.id , {$push:{'userSubmit':post.user.id}} )
  console.log(post2) 
  console.log('submitjob')
res.status(200).json(post2)
})


const adminSearch = asyncHandler(async (req, res) => {
  var post = await postSchema.find().where({'slipimg' : { $nin :[null,'']}}).populate('user')

})





  module.exports = {GetSearch,SelectedPost,SubmitJob,GetSearchBoost,GetSearchNotBoost,adminSearch}

