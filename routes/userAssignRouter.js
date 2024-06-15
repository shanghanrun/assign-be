const express = require('express')
const userAssignRouter = express.Router()

const userAssignController = require('../controller/userAssignController')
const authController = require('../controller/authController')

userAssignRouter.post('/', userAssignController.createUserAssignList) // post '/api/assign'

userAssignRouter.post('/list', userAssignController.getUserAssignList)
// userAssignRouter.post('/one', userAssignController.getUserAssign)
userAssignRouter.put('/update', authController.authenticate, authController.checkAdminPermission, userAssignController.updateUserAssign)


module.exports = userAssignRouter;

