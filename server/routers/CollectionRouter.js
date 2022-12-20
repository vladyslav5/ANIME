const Router = require('express');
const router = Router()

const collectionController = require('../Controllers/CollectionController')

const authMiddleware = require("../middleware/AuthMiddleware")

router.post('/create',authMiddleware,collectionController.create)
router.patch('/add/:_id',authMiddleware,collectionController.addAnime)
router.get('/',collectionController.getAll)
router.get('/my',authMiddleware,collectionController.myCollection)
router.get('/:_id',collectionController.getOne)
router.delete('/:_id',authMiddleware,collectionController.delete)

module.exports = router