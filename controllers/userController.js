 const userSchema = require('../models/userSchema');
let createUser=async(req,res)=>{

  console.log(req.body);
  const userData=new userSchema(req.body);
  try{
    const isUserExists=await userSchema.findOne({
      userEmail:req.body.userEmail

    });
    if(isUserExists){
      res.status(401).json({
        success:false,
        message:"user is already registerd",
      });
    
    }else{
      const user=await userData.save();
      res.status(201).json({
        success:true,
        message:"user succesfully registerd",
        user:user,

      });
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message:`Error occur ${error.message}`
    });
  }
};
  
  


module.exports = {
  createUser
}