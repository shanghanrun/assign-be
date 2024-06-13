const express = require('express')
const userRouter = express.Router()

const userController = require('../controller/userController')
const authController = require('../controller/authController')

userRouter.post('/', userController.createUser) // post '/api/user'
userRouter.post('/login', userController.loginWithEmail)
userRouter.post('/google', userController.loginWithGoogle)
userRouter.get('/me', authController.authenticate, userController.getUser)
userRouter.get('/', authController.authenticate, authController.checkAdminPermission, userController.getUserList)
userRouter.get('/verify-token', authController.verifyToken)
userRouter.put('/', authController.authenticate, authController.checkAdminPermission, userController.updateUser)

userRouter.put('/update', authController.authenticate, authController.checkAdminPermission,userController.updateUser)
userRouter.put('/plus-fail-no', authController.authenticate, authController.checkAdminPermission,userController.plusFailNo)
userRouter.put('/plus-not-submit-no', authController.authenticate, authController.checkAdminPermission,userController.plusNotSubmitNo)


module.exports = userRouter;

