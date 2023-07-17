const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
service: "Gmail",
auth:{
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});

const mailOptions = {

    from: "komalmeshram26929@gmail.com",
    to: "komalmeshram26929@gmail.com",
    subject: "hey mail from komal",
    text: "hey i am komal and i m sending mail to you",
};

module.exports = {
    transporter,
    mailOptions,
};