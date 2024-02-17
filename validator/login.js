const {z}=require("zod")

const login=z.object({
    email:z.string({required_error:"Email Required"})
    .email("Invalid Email"),
    password:z.string({required_error:"Password is required"}),
    })
module.exports={login}