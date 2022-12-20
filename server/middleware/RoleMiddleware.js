const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1]
            console.log(token, process.env.SECRET)
            if (!token) {
                next(ApiError.forbidden("Пользователь не авторизован"))
            }
            const userRoles = jwt.verify(token, process.env.SECRET).roles
            let hasRole = false;
            console.log(userRoles)
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                next(ApiError.forbidden("нету доступа"))
            }
            next()
        } catch (e) {

            next(ApiError.forbidden("у вас нету доступа"+e.message))
        }
    }
}