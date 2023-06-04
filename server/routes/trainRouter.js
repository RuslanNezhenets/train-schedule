const Router = require('express')
const trainController = require('../controllers/trainController')
const router = new Router()

router.post('/', trainController.create)
router.get('/', trainController.getAll)
router.get('/:id', trainController.getOne)
router.put('/:id', trainController.update)
router.delete('/:id', trainController.delete)

module.exports = router