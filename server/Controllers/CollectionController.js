const collectionModel = require("../models/CollectionModel")
const ApiError = require("../error/ApiError")
const userModel = require("../models/UserModel")

class CollectionController {
    async getOne(req, res) {
        const {_id} = req.params
        const collection = await collectionModel.findById(_id)
            .populate("animes")
            .then(col => res.json(col))
            .catch(err => console.log(err))

    }

    async myCollection(req, res, next) {
        const {_id} = req.user
        let {collections} = await userModel.findById(_id)
            .populate({
                path: "collections", populate: {
                    path: "animes"
                }
            })
        res.json(collections)
    }

    async create(req, res) {
        const {_id} = req.user

        const newCollection = collectionModel(req.body);
        const savedCollection = await newCollection.save()
        await userModel.findByIdAndUpdate(_id, {$push: {collections: savedCollection._id}})
        res.json("Добавление успешно")

    }

    async getAll(req, res) {

        await collectionModel.find(req.body)
            .populate("animes")
            .then(all => res.json(all))
            .catch(err => res.json(err))
    }

    async addAnime(req, res, next) {
        const {_id} = req.params
        const {animeId} = req.body
        const collection = await collectionModel.findByIdAndUpdate(_id, {$push: {animes: animeId}})
            .then(col => res.json("Успешно добавлено"))
            .catch(err => next(ApiError.badRequest(err.message)))

    }


    async delete(req, res) {

    }

}

module.exports = new CollectionController()