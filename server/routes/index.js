const Router = require('express')
const router = new Router()
const stationRouter = require('./stationRouter')
const trainRouter = require('./trainRouter')
const trainStationRouter = require('./trainStationRouter')

router.use('/station', stationRouter)
router.use('/train', trainRouter)
router.use('/trainStation', trainStationRouter)

module.exports = router