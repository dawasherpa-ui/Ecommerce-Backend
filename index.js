const express = require("express");
const cors=require("cors")
const app = express();
const mongoose = require("mongoose");
const { activityMiddleware } = require("./middleware/middleware");
const router = require("./router/product");
const userRouter = require("./router/user");
const DB = `mongodb+srv://jamudawa2:ayGNdH16ru30XAFC@cluster0.um2ki1w.mongodb.net/ruzabelle?retryWrites=true&w=majority`;

// connect MongoDB
mongoose
  .connect(DB)
  .then(() => console.log("connected MongoDB"))
  .catch((err) => console.log("error", err));
// Middleware
app.use(cors())
app.use(activityMiddleware);
// Routers
app.get("/",(req,res)=>res.send("<h1>Hello World!</h1>"));
app.use("/api/product", router);
app.use("/api/user",userRouter)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
