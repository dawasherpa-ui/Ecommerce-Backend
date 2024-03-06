const { Users } = require("../model/user")
const createUser = async (req, res) => {
  try {
    let user = await Users.create({
      Firstname: req.body.fname,
      Lastname: req.body.lname,
      Email: req.body.email,
      Password: req.body.password,
    });
    res.status(201).json({ message: "Create User", token: await user.generateToken(), id: user._id.toString() })
  }
  catch (e) { if(e.code=="11000")return res.status(403).json({message:"Email already exist"}) };
}
const updateUser = async (req, res) => {
  await Users.findByIdAndUpdate(req.params.id, {
    Firstname: req.body.fname,
    Lastname: req.body.lname,
    Email: req.body.email,
    Password: req.body.password,
  })
  res.json([{ message: "update Sucessful" }])
}
const deleteUser = async (req, res) => {
  await Users.findByIdAndDelete(req.params.id)
  res.json([{ message: "Deleted Sucessful" }])
}
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ Email: email });
  if (!user) {
    return res.status(401).send({ auth: false, message: 'Invalid Email.' })
  } else if (await user.comparePassword(password)) {
    let token = await user.generateToken();
    const response = {
      auth: true,
      token: token,
      id: user._id,
      firstName: user.Firstname,
      lastName: user.Lastname
    };
    const oneDayFromNow = new Date(Date.now() + (24 * 60 * 60 * 1000)); // 24 hours in milliseconds

    res.cookie("jwt", token, { expires: oneDayFromNow, httpOnly: true }).send(response);
  } else {
    return res.status(401).send({ auth: false, message: 'Invalid password' })
  }

}
const getSpecificUser=async (req,res)=>{
  try{
  let user=await Users.findById(req.params.id)
  if(user){
    const response={
      id: user._id,
      firstName: user.Firstname,
      lastName: user.Lastname
    };
   res.json(response)
  }else{
    res.status(404).json({search:0,message:"No User with this ID found!"})
  }
}catch(err){
    console.log(err)
    return res.status(500).send({serch:0,message:"Server error"})
  }
}

module.exports = { createUser, updateUser, deleteUser, loginUser,getSpecificUser }