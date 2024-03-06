const express = require("express");
const cors=require("cors")
const cookieParser =require("cookie-parser")
const app = express();
const mongoose = require("mongoose");
const { activityMiddleware } = require("./middleware/middleware");
const { verifyToken} = require("./middleware/auth");
const router = require("./router/product");
const userRouter = require("./router/user");
require('dotenv').config();
const DB = process.env.DB_Url
const Port  = process.env.PORT || 3000

// connect MongoDB
mongoose
  .connect(DB)
  .then(() => console.log("connected MongoDB"))
  .catch((err) => console.log("error", err));
// Middleware
const allowedOrigins = ['https://ecommerce-eight-khaki.vercel.app','http://localhost:3000', 'http://192.168.1.88:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser())
app.use(activityMiddleware);
// Routers
app.get("/",(req,res)=>res.send("<h1>Hello World!</h1>"));
app.use("/api/product",verifyToken, router);
app.use("/api/user",userRouter)
app.listen(Port, () => {
  console.log("Server running on port",Port);
});
