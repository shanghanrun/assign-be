const express = require('express')
const indexRouter = express.Router()
const userRouter = require('./userRouter')
const assignRouter = require('./assignRouter')
const reportRouter = require('./reportRouter')

indexRouter.use('/user', userRouter)
indexRouter.use('/assign', assignRouter)
indexRouter.use('/report', reportRouter)


module.exports = indexRouter