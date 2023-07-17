let express = require("express");
const userRouter = require("./userRoutes");
const companyRouter = require("./companyRoutes");
const reviewRouter = require("./companyReviewRoutes");

let commonRouter = express.Router();

commonRouter.use("/user", userRouter);
commonRouter.use("/company", companyRouter);
commonRouter.use("/companyreview", reviewRouter);

module.exports = commonRouter;
