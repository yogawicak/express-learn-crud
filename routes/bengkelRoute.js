const express = require('express')
const router = express.Router()
const bengkelController = require('../controllers/bengkelController')

router.get('/',bengkelController.getBengkel)
router.post('/',bengkelController.insertBengkel)
module.exports = router