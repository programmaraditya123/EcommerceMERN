const { hashPassword, comparePassword } = require('../helpers/authHelper');
const usermodel  = require('../models/usermodel');
const jwt = require("jsonwebtoken");

const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address,answer} = req.body;
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
        if(!answer){
            return res.send({message:'answer is required'});
        }
        //check user 
        const existingUser = await usermodel.findOne({email});
        //existing user
        if(existingUser){
            return res.status(200).json({
                suceess:false,
                message:'Already registred please login'
            })
        }
        //register user
        const hashedPassword= await hashPassword(password);
        //save 
        const user = await new usermodel({name,email,phone,address,password:hashedPassword,answer}).save();

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
                role:user.role,
                
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

//forgort password controlller
const forgotPasswordController = async (req,res) =>{
    try {
        const {email,answer,newpassword} = req.body;

        // console.log("888888888888888888",req.body)

        if(!email){
            res.status(400).send({message:"Email is requires"})
        }
        if(!answer){
            res.status(400).send({message:"Answer is requires"})
        }
        if(!newpassword){
            res.status(400).send({message:"Question is requires"})
        }
        //check user
        const user = await usermodel.findOne({email,answer});
        // console.log("-------",user)
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Email or answer is Wrong"
            });
        }


        const hashed = await hashPassword(newpassword);
        // console.log("*************",hashed)
       const preet =  await usermodel.findByIdAndUpdate({_id:user._id},{password:hashed});
    //    console.log("+++++++++++++",preet)
        res.status(200).send({
            success:true,
            message:"Password reset Successfully"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went Wrong"
        })
        
    }
};


const updateProfileController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        const user = await usermodel.findById(req.user._id);
        //password
        if(password && password.length < 6){
            return res.json({error:"Password is required and 6 characters long"})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await usermodel.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            email : email || user.email,
            password : hashedPassword || user.password,
            phone : phone || user.phone,
            address : address || user.address,
        },{new:true})
        res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            updatedUser
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in updating profile',error
        })
    }
};

module.exports = {registerController,loginController,testController,forgotPasswordController,updateProfileController};



 