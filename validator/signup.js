const { z } = require("zod");
const signUp = z.object({
  fname: z
    .string({ required_error: "FirstName is required" })
    .trim()
    .min(3, { message: "Less numbers of characters,firstName" })
    .max(150, { message: "Large number of characters" }),
  lname: z
    .string({ required_error: "LastName is required" })
    .trim()
    .min(3, { message: "Less numbers of characters,LastName" })
    .max(150, { message: "Large number of characters,LastName" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Less numbers of characters,Email" })
    .max(150, { message: "Large number of characters,Email" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "Less numbers of characters,Password" })
    .max(150, { message: "Large number of characters,Password" }),
});
module.exports = signUp;
