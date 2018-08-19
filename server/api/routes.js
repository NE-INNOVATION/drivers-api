const express = require('express')
const driverRoutes = require('./drivers').routes

const router = express.Router({mergeParams: true})
router.use('/drivers', driverRoutes)

module.exports = router