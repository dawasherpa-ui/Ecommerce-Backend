const express=require("express");
const router=express.Router();
const bodyParser = require("body-parser");
const {getAllProduct,getProduct, createProduct,updateProduct,deleteProduct}=require("../controller/product")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route("/")
.get(getAllProduct)
.post(createProduct)
router.get("/query",getProduct)
router.route("/:id")
.patch(updateProduct)
.delete(deleteProduct)

module.exports=router