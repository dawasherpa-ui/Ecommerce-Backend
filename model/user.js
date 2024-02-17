const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Please provide an email"],
    },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);
// Encrypt password before saving the user to database using middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({ _id: this._id, email: this.Email }, "dawaSherpa14211");
  } catch (err) {
    console.log(err);
  }
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.Password);
};
const Users = mongoose.model("users", userSchema);
module.exports = { Users };
