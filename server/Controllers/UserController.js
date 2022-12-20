const userModel = require("../models/UserModel")
const collectionModel = require("../models/CollectionModel")
const roleModel = require("../models/RoleModel")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const uuid = require("uuid")
const path = require('path')

const ApiError = require("../error/ApiError")
const {validationResult} = require('express-validator')

const generateAccessToken = (_id, roles) => {
    const payload = {_id, roles}
    return jwt.sign(payload, process.env.SECRET, {expiresIn: 60 * 60 * 2})

}

class UserController {
    async registration(req, res, next) {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors))
        }
        const {email, password} = req.body

        const candidate = await userModel.findOne({email: email})
        if (candidate) {
            return next(ApiError.badRequest("пользователь с таким емайлом уже существует"))
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userRole = await roleModel.findOne({name: "USER"})
        const favoriteCollection = new collectionModel({name: "FAVORITE"})
        const savedFavoriteCollection = await favoriteCollection.save()
        const regDate = new Date().toDateString()
        const newUser = new userModel({
            email: email,
            password: hashedPassword,
            regDate: regDate,
            collections: [savedFavoriteCollection],
            roles: [userRole.name],

        })
        const savedUser = await newUser.save()
        console.log(savedUser)
        const token = generateAccessToken(savedUser._id, savedUser.email, savedUser.roles)
        req.accessToken = {token}
        return res.json({token})
    }

    async getInfo(req, res,next) {
        try{
            const userId = req.params
            let user = await userModel.findById(userId).populate("collections")
            const {collections,avatar,header,email,regDate} = user
            res.json({collections,avatar,header,email,regDate})
        }catch (e) {
           next(ApiError.badRequest("getinfo"))
        }



    }

    async edite(req, res, next) {
        const {avatar, header} = req.files
        let fileNameAvatar = uuid.v4() + ".jpg"
        let fileNameHeader = uuid.v4() + ".jpg"
        await avatar.mv(path.resolve(__dirname, "..", "static", fileNameAvatar))
        await header.mv(path.resolve(__dirname, "..", "static", fileNameHeader))
        await userModel.findByIdAndUpdate(req.user._id, {avatar: fileNameAvatar, header: fileNameHeader})
            .then(r => res.json("успешно изменено"))
            .catch(err => next(ApiError.badRequest(err.message)))
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if (!user) {
            return next(ApiError.badRequest("Пользователь с таким емеил не найден"))
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return next(ApiError.badRequest("неверный пароль"))
        }

        const token = generateAccessToken(user._id, user.email, user.roles)
        req.accessToken = {token}
        return res.json({token})


    }

    async check(req, res) {
        const token = generateAccessToken(req.user._id, req.user.email, req.user.roles)
        return res.json({token})
    }
}

module.exports = new UserController()