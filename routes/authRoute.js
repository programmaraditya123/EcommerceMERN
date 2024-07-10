const express = require('express');
const {registerController} = require('../controller/authController');
const {loginController,testController} = require('../controller/authController');
const { sign } = require('jsonwebtoken');
const {requireSignIn} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/authMiddleware');


//router object
const router = express.Router();

//ROUTING 
//Register || method POST
router.post("/register",registerController);

//login || method POST
router.post("/login",loginController);

//test controller
router.get("/test",requireSignIn,isAdmin,testController);

module.exports = router;