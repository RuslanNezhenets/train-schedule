const Router = require('express')
const trainStationController = require('../controllers/trainStationController')
const router = new Router()

router.post('/', trainStationController.create)
router.get('/', trainStationController.getAll)
router.get('/:trainId/station/:stationId', trainStationController.getOne)
router.get('/:startStationId/endStation/:endStationId', trainStationController.getTrains)
router.put('/:trainId/station/:stationId', trainStationController.update)
router.delete('/:trainId/station/:stationId', trainStationController.delete)

module.exports = router