const mongoose =require("mongoose")

const productSchema =new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String },
    tag: { type: Array, required: [true, 'Tag is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    soldOut: { type: Number },
    stock: { type: Number },
    owner: { type: String, required: [true, 'Owner is required'] }
    },{timestamps:true})

const Product= mongoose.model("products",productSchema);
module.exports={Product};