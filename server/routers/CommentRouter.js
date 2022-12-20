const express = require("express")
const router = express.Router({mergeParams: true})

const commentController = require("../Controllers/CommentController")
const animeController = require("../Controllers/AnimeController");
const authMiddleware = require("../middleware/AuthMiddleware")
router.get("/comments", commentController.getAll)
router.get("/comment/:_id", commentController.getOne)
router.post('/comment', authMiddleware, commentController.comment)
router.patch("/comment/:_id", authMiddleware, commentController.refactor)
router.post("/comment/:_id", authMiddleware, commentController.answer)

module.exports = router