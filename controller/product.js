const {Product}=require("../model/product")
const getAllProduct=async(req,res)=>{
    const user=await Product.find({})
    res.status(200).json(user)
    console.log("data",user)
}
const getProduct=async(req,res)=>{
    const user=await Product.find({name:req.query.name})
    res.status(200).json(user)
    console.log("data",user)
}
const updateProduct=async(req,res)=>{
    await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        tag: req.body.tags,
        price: req.body.price,
        sold:req.body.sold
    })
    res.json([{message:"update Sucessful"}])
}
const createProduct = async (req, res) => {
    console.log(req.body);
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        tag: req.body.tags,
        price: req.body.price,
    });
    res.status(201).json([{ message: "created", id: product._id }]);
}
const deleteProduct=async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.json([{message:"Deleted Sucessful"}])
}
module.exports={getAllProduct,getProduct,createProduct,updateProduct,deleteProduct}