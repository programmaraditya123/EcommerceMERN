const express = require('express');
const {loginController,testController,forgotPasswordController,registerController, updateProfileController} = require('../controller/authController');
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

// forgot password ||post
router.post("/forgot-password",forgotPasswordController)

//test controller
router.get("/test",requireSignIn,isAdmin,testController);

//protected route-user dashboard
router.get("/user-auth",requireSignIn,(req,res) =>{
    res.status(200).send({ok:true});
})

//protecteed route for admin dashboard
router.get("/admin-auth",requireSignIn,isAdmin,(req,res) =>{
    res.status(200).send({ok:true});
})


//update user profile
router.put("/profile",requireSignIn,updateProfileController);

module.exports = router;