const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.put('/:id',userController.update)
router.put('/:id/ChangePassword',userController.updatePassword)
module.exports = router