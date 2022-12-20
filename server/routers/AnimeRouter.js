const Router = require('express');
const router = Router()

const animeController = require('../Controllers/AnimeController')
const commentRouter = require("./CommentRouter")


router.get('/',animeController.getAll)
router.get('/:_id',animeController.getOne)
router.post('/',animeController.add)
router.use('/:_id',commentRouter)
module.exports = router