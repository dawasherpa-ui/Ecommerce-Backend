const mongoose =require("mongoose")

const productSchema =new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    tag:{type:Array,required:true},
    price:{type:Number,required:true},
    soldOut:{type:Number},
    stock:{type:Number}
    },{timestamps:true})

const Product= mongoose.model("products",productSchema);
module.exports={Product};