const ApiError = require("../error/ApiError")

const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            next(ApiError.forbidden("Пользователь не авторизован"))
        }
        const decodedData = jwt.verify(token, process.env.SECRET)
        req.user = decodedData
        next()
    } catch (e) {

        next(ApiError.forbidden("Пользователь не авторизован" + e.message))
    }
}