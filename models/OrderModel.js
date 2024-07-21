//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products",
        },
    ],
    payment:{
        type:Object,
        required:true,
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipped","Delivered","Cancel"]
    },
},{timestamps:true})

module.exports = mongoose.model('Order',orderSchema);