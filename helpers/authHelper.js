const bcrypt = require('bcrypt');

const hashPassword = async (password) =>{
    console.log("password to be hashed",password)
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
    } catch (error) {
        console.log("while hasing password",error);
        
    }
};

const comparePassword = async (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}