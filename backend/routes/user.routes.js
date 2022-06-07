const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUser,
  currentUser,
  getUser,
} = require('../controllers/userController')
const { protect, adminCheck} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/signin', loginUser) // รับจาก front

router.route('/update-user').put(protect, updateUser)
// Verify token from Client and POST user data back
router.post('/current-user', protect, currentUser)


router.get('/get-user', protect, getUser)



router.post("/current-admin", protect,adminCheck,currentUser);  //*** เดี๋ยวต้องแก้ currentUser เป็น currentAdmin หรืออาจจะไม่ต้องมีเลย



module.exports = router