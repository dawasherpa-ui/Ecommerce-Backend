const { Product } = require("../model/product")
const getAllProduct = async (req, res) => {
    const user = await Product.find({})
    res.status(200).json(user)
    // console.log("data",user)
}
const getProduct = async (req, res) => {
    try {
        const { name, page, limit } = req.query;
        const user = await Product.find({
            $or: [
                { name: { $regex: new RegExp(name, "i") } }, // Partial match in name
                { tag: { $regex: new RegExp(name, "i") } }, // Partial match in description
            ]
        })
            .skip((page - 1) * limit)
            .limit(limit)
        if (user.length > 0) {
            res.status(200).json({ search: user.length, user })
        }
        else {
            res.status(404).send({ search: 0, message: 'No Data Found' })
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ search: 0, message: 'Error in search' });
    }
}
const getSpecific = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const user = await Product.findById(id)
        if (!user) {
            return res.status(400).json({ search: 0, message: "User Not Found" })
        } else {
            res.status(200).json(user)
        }

    } catch (e) {
        res.status(400).json({ search: 0, message: e.message })
    }
}
const updateProduct = async (req, res) => {
    try{
    await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        tag: req.body.tag,
        price: req.body.price,
    })
    res.json({ message: "update Sucessful" })
}catch(err){
    res.status(500).json({message:"Internal server error"})
}
}
const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            owner: req.body.owner,
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            tag: req.body.tag,
            price: req.body.price,
        });
        res.status(201).json({ message: "created", id: product._id });
    } catch (err) { res.status(403).json({ message: "Please fill all reuired field" }) }
}
const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted Sucessful" })
}
const getUserProduct = async (req, res) => {
    try {
        let userId = req.params.userId;
        const user = await Product.find({ owner: userId });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).send({ search: 0, message: "No User Found" });
        }
    } catch (err) { 
        console.log(err)
    }
}
module.exports = { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct, getSpecific, getUserProduct }