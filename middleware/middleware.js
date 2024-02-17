const activityMiddleware=(req,res,next)=>{
    console.log(`Request made to ${req.url},Method ${req.method}, Time ${Date.now()}`)
    next()
}
module.exports={activityMiddleware}