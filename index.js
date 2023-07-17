require("dotenv").config();
let express = require("express");

require("./config/modelConfig");

//const logger = require("./utils/logger");
const { transporter, mailOptions } = require("./services/emailService");
const cron = require("node-cron");
let commonRouter = require("./routes/mainRoutes");

let app = express();

app.use(express.json());
app.use("/", commonRouter);

//app.use('/',authToken)

app.get("/send", async (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent succesfully" + info.response);
    }
  });
});
cron.schedule("*/5 * * * * *", function () {
  // console.log("running every 10 seconds");
  //transporter.sendMail(mailOptions,(error,info)=>{
  //  if(error){
  //    console.log(error);
  //}else{
  //console.log("email sent succesfully"+ info.response);
  //}
  //});
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on PORT:${process.env.PORT}`);
});
