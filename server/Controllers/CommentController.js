const CommentModel = require("../models/CommentModel")
const AnimeModel = require("../models/AnimeModel");

class CommentController {
    async answer(req, res) {
        const {_id: userId} = req.user
        const {_id} = req.params
        const comment = await CommentModel.findById(_id)
            .catch(err => res.json(err))
        const {text} = req.body;
        const {animeId} = comment
        const newAnswer = new CommentModel({text: text, animeId: _id, userId: userId})
        const savedAnswer = await newAnswer.save()
        await savedAnswer.populate("userId")
        await CommentModel.findByIdAndUpdate(_id, {$push: {answers: savedAnswer._id}})
            .then((c) => res.json(savedAnswer))
            .catch(err => res.json(err))

    }

    async comment(req, res) {
        const {_id: userId} = req.user
        const {_id} = req.params
        const {text} = req.body
        const newComment = new CommentModel({text: text, animeId: _id, userId: userId})
        const savedComment = await newComment.save()
        await savedComment
            .populate([
                {path: "userId", select: ["email", "avatar"]},
                {
                    path: "answers", populate: {
                        path: "userId",
                        select: ["avatar", "email"]
                    }
                }
            ])
        res.json(savedComment)


    }

    async refactor(req, res) {
        const {_id} = req.params
        const {text} = req.body
        await CommentModel.findByIdAndUpdate(_id, {text: text})
            .then(newComment => res.json(newComment))
            .catch(err => res.json(err))

    }

    async getOne(req, res) {
        const {_id} = req.params
        const comment = await CommentModel.findById(_id)
            .then(com => res.json(com))
            .catch(err => res.json(err))
    }

    async getAll(req, res) {
        const {_id} = req.params
        const comments = await CommentModel.find({animeId: _id})
            .populate([
                {path: "userId", select: ["email", "avatar"]},
                {
                    path: "answers", populate: {
                        path: "userId",
                        select: ["avatar", "email"]
                    }
                }
            ])
            .then(com => res.json(com))
            .catch(err => res.json(err))

    }

}

module.exports = new CommentController()