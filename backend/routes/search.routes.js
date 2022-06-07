
const express = require('express')
const router = express.Router()

const { GetSearch, SelectedPost, SubmitJob ,GetSearchBoost,GetSearchNotBoost,adminSearch} = require('../controllers/searchController')

router.post('/',GetSearch)
router.post('/gsb',GetSearchBoost)
router.post('/gsnb',GetSearchNotBoost)
router.get('/:id',SelectedPost)
router.put('/:id',SubmitJob)
router.get('/admin',adminSearch)


module.exports = router

