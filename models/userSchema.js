const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  //userID : {type : mongoose.Schema.Types.ObjectId}, referencing ke liye hai
  userName : {type : String , required : true},
  userPhone : {type : String , required : true},
  userEmail : {type : String , required : true},
  userPassword : {type : String , required : true},
  userCity : {type : String , required : true},
  userState : {type : String , required : true},
  userRole : {type : String , default : "user"},
  isActive : {type : String , default : true }
})
userSchema.set("timestamps" , true)

module.exports = mongoose.model("user" , userSchema)