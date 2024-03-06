const express=require("express");
const router=express.Router();
const bodyParser = require("body-parser");
const {getAllProduct,getProduct, createProduct,updateProduct,deleteProduct, getSpecific, getUserProduct}=require("../controller/product")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route("/")
.get(getAllProduct)
.post(createProduct)
router.get("/search",getProduct)
router.route("/:id")
.get(getSpecific)
.patch(updateProduct)
.delete(deleteProduct)
router.get( "/user/:userId",getUserProduct );

module.exports=router