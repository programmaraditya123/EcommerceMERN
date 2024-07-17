const fs = require('fs');
const ProductModel = require('../models/ProductModel');
const slugify = require('slugify');


const createProductController = async (req,res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping } =req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'});
            case !description:
                return res.status(500).send({error:'description is required'});
            case !price:
                return res.status(500).send({error:'priceis required'});
            case !category:
                return res.status(500).send({error:'Category is required'});    
            case !quantity:
                return res.status(500).send({error:'quantity is required'});
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'photo is required and size must be less than 1MB'})
        }

        const products = new ProductModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'product created succesfully',
            products,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Creating Product'
        })
        
    }
};


const getProductController = async (req,res) =>{
    try {
        const products = await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            totalcount:products.length,
            message:"All Products",
            products,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Product',
            error:error.message
        })
        
    }
};

const getSingleProductController = async (req,res) =>{
    try {
        const product = await ProductModel.findOne({slug:req.params.slug}).select('-photo').populate('category');
        res.status(200).send({
            success:true,
            message:'Single Product Fetched',
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single product",
            error:error.message,
        })
    }
};

const productPhotoController = async (req,res) =>{
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting product photo',
            error:error.message,
        })
        
    }
};

const deleteProductController = async (req,res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'Product deleted successfully',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delting photo',
            error
        })
        
    }
};

const updateProductController = async (req,res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping } =req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'});
            case !description:
                return res.status(500).send({error:'description is required'});
            case !price:
                return res.status(500).send({error:'priceis required'});
            case !category:
                return res.status(500).send({error:'Category is required'});    
            case !quantity:
                return res.status(500).send({error:'quantity is required'});
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'photo is required and size must be less than 1MB'})
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'product updated succesfully',
            products,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating Product'
        })
        
    }
};


const filterProductController = async (req,res) =>{
    try {
        const {checked , radio } = req.body;
        let args ={};
        if (checked.length >0) args.category = checked;
        if(radio.length) args.price = {$gte : radio[0] ,$lte :radio[1]};
        const products = await ProductModel.find(args);
        res.status(200).send({
            success:true,
            message:'Error while Filtering products',
            products
        })       
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in filtering Product',
            error
        })
        
    }
};


//product count controller
const productCountController = async (req,res) =>{
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in counting products",
            error
        })
        
    }
};


//products per page
const productListController = async (req,res) =>{
try {
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in fetching products',
        error
    })
    
}}







module.exports = {createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController,filterProductController,productCountController,productListController};