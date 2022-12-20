const Router = require('express');
const router = Router()

const animeRouter = require('./AnimeRouter')
const userRouter = require('./UserRouter')
const collectionRouter = require("./CollectionRouter")
router.use('/anime', animeRouter)
router.use('/user', userRouter)
router.use('/collection',collectionRouter)

module.exports = router