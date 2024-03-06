const express=require("express");
const router=express.Router();
const bodyParser = require("body-parser");
const { createUser, deleteUser, updateUser, loginUser, getSpecificUser } = require("../controller/user");
const signUp = require("../validator/signup");
const validator= require("../middleware/validator");
const { login } = require("../validator/login");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route("/")
  .post(validator(signUp),createUser);
router.post("/login",validator(login),loginUser)
router.route("/:id")
.get(getSpecificUser)
.patch(updateUser)
.delete(deleteUser)
module.exports=router