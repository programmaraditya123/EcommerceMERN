const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

//protected route token base
const requireSignIn = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "token is not present" });
    }

    console.log("token hai mere ye", token);

    console.log("preeeeeeeeeet", process.env.JWT_SECRET);

    if(token.startsWith("Bearer ")){
        token = token.slice(7)
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    console.log("p", decode);

    next();
  } catch (error) {
    console.log(error);
  }
};



//admin accesss
const isAdmin = async (req, res, next) => {
    try {
        const user = await usermodel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Acesss"
            });}
            else {
                next();
            }
        }
        
    catch (error) {
       console.log(error);
       res.status(401).send({
        success:false,
        error,
        message:"error in admin middleware"
       });
    }
};







module.exports ={ requireSignIn,isAdmin};
//module.exports = isAdmin;
