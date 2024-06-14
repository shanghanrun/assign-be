const express = require('express')
const assignRouter = express.Router()

const assignController = require('../controller/assignController')
const authController = require('../controller/authController')

assignRouter.post('/', assignController.createAssign) // post '/api/assign'

assignRouter.get('/list', assignController.getAssignList)
assignRouter.post('/one', assignController.getAssign)
assignRouter.put('/update', authController.authenticate, authController.checkAdminPermission, assignController.updateAssign)


module.exports = assignRouter;

