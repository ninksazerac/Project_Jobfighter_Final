const mongoose = require('mongoose')

const appSchema = mongoose.Schema(
  { 
    // user ID ที่คนที่สมัครงาน
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // post ID ที่สมัครงาน
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    status: {           // สถานนะการยอมรับเข้าทำงาน => Approved, wait, denide
      type: String,     
      default: 'wait'
    },
    
    resume:String,
    
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('jobApp', appSchema)
