const Router = require('express')
const stationController = require('../controllers/stationController')
const router = new Router()

router.post('/', stationController.create)
router.get('/', stationController.getAll)
router.get('/:id', stationController.getOne)
router.put('/:id', stationController.update)
router.delete('/:id', stationController.delete)

module.exports = router