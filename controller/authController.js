const { hashPassword, comparePassword } = require('../helpers/authHelper');
const usermodel  = require('../models/usermodel');
const jwt = require("jsonwebtoken");

const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        if(!name){
            return res.send({message:'Name is required'});
        }
        if(!email){
            return res.send({message:'email is required'});
        }
        if(!password){
            return res.send({message:'password is required'});
        }
        if(!phone){
            return res.send({message:'phone is required'});
        }
        if(!address){
            return res.send({message:'address is required'});
        }
        //check user 
        const existingUser = await usermodel.findOne({email});
        //existing user
        if(existingUser){
            return res.send(200).send({
                suceess:false,
                message:'Already registred please login',error
            })
        }
        //register user
        const hashedPassword= await hashPassword(password);
        //save 
        const user = await new usermodel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in registration",error
        })
        
    }
};



const loginController  = async (req,res) =>{
    try {
        const{email,password} = req.body;
        //validation email || password
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
                        })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Loggedin successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                
            },
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',error
        })
        
    }
};

//test controller
const testController = (req,res) => {
    try {
        res.status(200).json({ message:'test controller'})        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in login',error  
        })
        
    }
    
};

module.exports = {registerController,loginController,testController};



 