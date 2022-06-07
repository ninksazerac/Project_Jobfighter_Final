let jwt = require("jsonwebtoken");
bcrypt = require("bcrypt");
asyncHandler = require("express-async-handler");
userSchema = require("../models/userModel");
const appSchema = require("../models/jobappModel");
const postSchema = require('../models/postModel')
// @desc        Register new user
// @End point   PointPOST /users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await userSchema.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await userSchema.create({
    // name: req.body.name,
    email,
    password: hashedPassword,
    role: req.body.role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
    console.log("Register success");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @End Point   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await userSchema.findOne({ email });

  // หรือจะใช้ const user = await User.findOneAndUpdate({ email },{new: true}); จะอัพเดทเวลาการ login ให้

  if (user && (await bcrypt.compare(password, user.password))) {
    // Payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };

    res.json({
      payload,
      token: generateToken(user._id),
    });

    console.log("Login success");

    if (user.role === "admin") {
      const posts = await postSchema.find({ postDateExpire: { $ne: "" } });
      console.log("total posts : ", posts.length);
      for (var i = 0; i < posts.length; i++) {
        var dateExp = posts[i].postDateExpire;
        var result = new Date().getTime() > new Date(dateExp).getTime();
        console.log(i);
        console.log(
          posts[i].id,
          " ",
          i,
          " ",
          result,
          new Date(dateExp).getTime(),
          new Date().getTime()
        );
        if (result === true) {
          await postSchema.findByIdAndDelete(posts[i].id);
          console.log(posts[i].id, " ", i, " del");
          await appSchema.findOneAndDelete({'post':posts[i].id})
        }

      }
    
    }
  } else {
    res.status(400);
    throw new Error(
      "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้ง"
    );
  }
});

const getUser = asyncHandler(async (req, res) =>{
  try{
    const userdata = await userSchema.findById(req.user.id)
    res.json(userdata)
  } catch(err){
    console.log('user error')
  }
})


// @desc  update user
// @End Point   Put /users/edit-user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error("User not exists");
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
      }
    );
    console.log("Updated", updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

// @desc   Get current user data
// @End Point   Post /users/current-user
// @access  Private
const currentUser = asyncHandler(async (req, res) => {
  try {
    const user = await userSchema
      .findById(req.user.id)
      .select("-password")
      .exec(); //** ไม่ได้ส่งรูปไป
    console.log("Currentuser", user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "999h",
  });
};




module.exports = {
  registerUser,
  loginUser,
  updateUser,
  currentUser,getUser
};
