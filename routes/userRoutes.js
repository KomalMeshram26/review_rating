const express = require("express");
const {
  createUser,
  userLogin,
  checkToken,
  userPasswordEmail,
  userPasswordReset,
} = require("../controllers/userController");
const { registerUserValidation,userLoginValidation,passwordReset } = require("../Validations/user/userDataValidate");
const { userAuthetication,userAuthorization } = require("../middlewares/authToken");
const {upload}= require("../middlewares/userImageStorage");
//const { resetlinkPaasword } = require("../controllers/userController");




const userRouter = express.Router();

userRouter.post("/create",upload.single("profilePic"), registerUserValidation,  createUser);
//router.post('/create',upload.single("ProfilePic"),registerUserValidation)
userRouter.get("/login",userLoginValidation, userLogin);
userRouter.get("/check", userAuthetication, checkToken);
userRouter.get("/check",userAuthorization , createUser);
userRouter.post("/resetlinkPaasword", userPasswordEmail);
userRouter.post("/resetpassword/:id/:token",passwordReset, userPasswordReset);

module.exports = userRouter;
