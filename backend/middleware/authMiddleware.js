const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
      // ชนิด header ในการ authorization 'Bearer'
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')   
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token                      .select('-password')   ใส่ลบ( - )คือ ไม่ต้องการข้อมูล password 
      req.user = await User.findById(decoded.id).select('-password').exec()

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('authorization denied, no token')
  }
})

const adminCheck = asyncHandler( async(req, res, next) => {
  try {
    const adminUser = await User.findById( req.user.id ).exec()
    if(adminUser.role !== 'admin'){
      res.status(403).send(err,'Admin Access denied')
    } else{
      next()
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Admin Access denied");
  }
})

module.exports = { protect, adminCheck}

