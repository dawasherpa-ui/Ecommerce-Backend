const validator=(schema)=>async(req,res,next)=>{
   try{
    const parseBody=await schema.parseAsync(req.body)
    req.body=parseBody
    next()
   }catch(err){
    console.log(err.errors[0].message)
    res.status(400).json({
        status:"fail",
        message: err.errors[0].message
        })
   }
}
module.exports = validator;