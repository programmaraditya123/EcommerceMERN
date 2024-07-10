const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        console.log(`connnected to mongodb dtabase ${conn.connection.host}`.bgMagenta.white);
    }
    catch (error){
        console.log(`Error in mongoodb ${error}`.bgRed.white);
    }
};

module.exports = connectDB;