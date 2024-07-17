const CategoryModel = require('../models/CategoryModel');
const slugify = require('slugify');

const  createCategoryController = async (req,res) =>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'name is required'})
        }
        const existingCategory = await CategoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({success:true,message:'Category Already Exists'})
        }
        const category = await new CategoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({success:true,message:'new Category Created' ,category})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
        
    }
};

const updateCategoryController = async (req,res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:'Category updated succesfully',
            category,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating Category'
        })
        
    }
};


const categoryController = async (req,res) =>{
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success:true,
            message:'list of all categories',
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all categories"
        })
        
    }
};


const singleCategoryController = async (req,res) =>{
    try {
        //const {slug} =req.params;
        const category = await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get single id Succesfully',
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error whhile geting single category"
        })
        
    }
};


const deleteCategoryController = async (req,res) =>{
    try {
        const {id} = req.params;
        await CategoryModel.findByIdAndDelete({_id:id})
        res.status(200).send({
            success:true,
            message:'Category Deleted successfully',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting',
            error,
        })
        
    }
};









module.exports = {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController};