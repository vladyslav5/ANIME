const AnimeModel = require('../models/AnimeModel')
const CommentModel = require("../models/CommentModel")
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

class AnimeController {
    async getAll(req, res) {
        const {page} = req.query || 0
        const {limit} = req.query || 2
        const allAnime = await AnimeModel.find({})
            .then(all => {
                const length = all.length
                all = all.slice((page-1)*limit,page*limit)
                res.json({animes:all,totalCount:length})
            })
            .catch(err => res.json(err))
    }

    async add(req, res) {
        const anime = req.body;
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, "..", "static", fileName))
        const newAnime = new AnimeModel({...anime, img: fileName});
        const savedAnime = await newAnime.save()
            .then((s) => {
                res.json(s);
            }).catch((err) => {
                res.json(err)
            })

    }

    async getOne(req, res, next) {
        const {_id} = req.params;
        // {
        //     path: "comments", populate: {
        //     path: "answers",
        //         populate:{
        //         path: "userId",
        //             select:["avatar","email"]
        //     }
        // }
        // }
        const oneAnime = await AnimeModel.findById(_id)
            .populate({
                path: "comments", populate: [
                    {path: "userId", select: ["avatar", "email"]},
                    {
                        path: "answers", populate: {
                            path: "userId",
                            select: ["avatar", "email"]
                        }
                    }

                ]
            })
            .then(one => res.json(one))
            .catch(err => next(ApiError.badRequest("немогу")))
    }


}

module.exports = new AnimeController()