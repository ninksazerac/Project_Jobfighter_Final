const express = require('express')
const router = express.Router()

const {
  SubmitJob,
  getSubmited,   
  SearchOne,
    getApp, 
    changeStatus
  } = require('../controllers/jobappController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect,getSubmited)          
router.route('/').post(protect,SubmitJob)
router.route('/focheck/:id').get(protect,SearchOne)

router.route('/applications').get(protect,getApp)             
router.route('/changeStatus').post(protect,changeStatus)           
module.exports = router