const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {createProductController,getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, filterProductController, productCountController, productListController} = require('../controller/ProductController');
const formidable = require('express-formidable');

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

// get products
router.get('/get-product',getProductController)

//Single product controller
router.get('/get-product/:slug',getSingleProductController);


//get-photo
router.get('/get-photo/:pid',productPhotoController);

//delete product
router.delete('/delete-product/:pid',deleteProductController);


//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);


//filter route for products
router.post('/product-filters',filterProductController);


//product count
router.get('/product-count',productCountController);  


//product per page
router.get('/product-list/:page',productListController);






















module.exports = router;