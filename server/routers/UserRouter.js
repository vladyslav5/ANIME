const Router = require('express');
const router = Router()

const {check} = require("express-validator")

const userController = require('../Controllers/UserController')

const authMiddleware = require("../middleware/AuthMiddleware")
const roleMiddleware = require("../middleware/RoleMiddleware")

router.post('/registration',[
     check("email","емаил не может быть пустым").notEmpty(),
    check("password","Пароль должен быть длиннее 6 символов и короче 11").isLength({min:6,max:11})
],userController.registration)
router.post('/login',userController.login)
router.patch("/profile",authMiddleware,userController.edite)
router.get("/profile/:_id",authMiddleware,userController.getInfo)
router.get('/auth',authMiddleware,userController.check)
module.exports = router