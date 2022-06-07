const express = require('express')
const router = express.Router()
const {
  getPosts,
  currentPost,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,
  changeEnable,
  adgetPost,
  payPost,
  getpayPost,
} = require('../controllers/postController')
const { protect, adminCheck } = require('../middleware/authMiddleware')

// @role USER
// get all posts
router.route('/all').get( getPosts)

// get post & company data when user click in post 
router.route('/:id').get(currentPost) 

// @role COMPANY
// ใส่ protect => ยืนยัน token จะได้ user id เพื่อนำมาเช็คกับ post.user.id
router.route('/').get(protect, getUserPosts)             // get post ทั้งหมด ของ company
router.route('/').post(protect, setPost)
router.route('/edit-post/:id').put(protect, updatePost)
router.route('/:id').delete(protect, deletePost)         // ต้องใช้ token และ id post 
router.route('/pay/:id').put(protect,payPost).get(protect,getpayPost)
router.route('/adget/xx').get(protect,adgetPost)             // get post ทั้งหมด ของ company


// @role ADMIN
// อัพเดท status post (ทำไมถึงใช้ post ไม่ใช้ put วะ กูงง)
router.route('/change-enable').post(protect, adminCheck, changeEnable)

module.exports = router
