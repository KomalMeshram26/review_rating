const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt"); //for pass bcrypt
const jwt = require("jsonwebtoken"); //for create token
const { unlinkSync } = require("fs"); //for image
const { transporter } = require("../services/emailService"); //for email
//=======================createrUser=====================
let createUser = async (req, res) => {
  console.log(req.body);
  
  const Salt = await bcrypt.genSalt(10);
  const userData = new userSchema(req.body);
  try {
    userData.userName = req.body.userName
      .trim()
      .split(" ")
      .map((data) => {
        return data.charAt(0).toUpperCase() + data.slice(1);
      })
      .join(" ");
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(401).json({
        success: false,
        message: "user email is already registerd",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, Salt);

      const filePath = `/uploads/${req.file.filename}`;
      userData.profilePic = filePath;
      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "user succesfully registerd",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};
//==========================loginUser==========================
let userLogin = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "login successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "user not find",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

let checkToken = (req, res) => {
  res.send("hey token is valid");
};
//---------------------for sending emailtoken----------------
let userPasswordEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    console.log("Email user", userData);
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "30m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "komalmeshram26929@gmail.com",
        to: userEmail,
        subject: "email for reset password",
        text: `<a href =${link}>Click on this for reset password`,
      });
      return res.status(201).json({
        sucess: true,
        message: "email send succesfully",
        token: token,
        userid: userData._id,
      });
    } else {
      res
        .status(403)
        .json({ success: false, error: "email user is not found" });
    }
  } catch (err) {
    res.status(500).json({
      success: "failer",
      error: err.message,
    });
  }
};

//reset password----------------------------------------------------------------------------------
let userPasswordReset = async (req, res) => {
  const { id, token } = req.params;
  console.log("id token :", id, token);
  const { newPassword, conformPassword } = req.body;
  try {
    let checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretkey = checkUser._id + process.env.JWT_SECRET_KEY;
      // jwt.verify(token, secretkey);
      if (newPassword === conformPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(conformPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptPassword },
        });
        res.status(200).json({
          success: true,
          message: "user password update succesfully",
        });
      } else {
        res.status(401).json({
          sucess: false,
          message: "new password and conforn password is not match",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        error: "email user is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  checkToken,
  userPasswordEmail,
  userPasswordReset,
};
