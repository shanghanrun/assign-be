const express = require('express')
const reportRouter = express.Router()

const reportController = require('../controller/reportController')
const authController = require('../controller/authController')

reportRouter.post('/', reportController.createReport) // post '/api/report'

reportRouter.post('/list', reportController.getUserReportList)
reportRouter.post('/one', reportController.getReport)
reportRouter.put('/update', authController.authenticate, authController.checkAdminPermission, reportController.updateReport)


module.exports = reportRouter;

