const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController , } = require('../controller/CategoryController');

const router = express.Router();

//routes

//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

//update cactegory
router.put('/update-category/:id',requireSignIn , isAdmin , updateCategoryController);

//get all categories
router.get('/get-category',categoryController);

//single category
router.get('/single-category/:slug',singleCategoryController);

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);


module.exports = router;