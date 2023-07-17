 const express = require("express");

 const {
   createReview,
   updatedReview,
   deleteReview,
   //reviewDetails,
 } = require("../controllers/companyReviewController");
 //const {upload}= require("../middlewares/companyimageStorage");
 //const {addCompanyReviewDataValidation}= require("../Validations/review/companyReviewDataVal")
  let reviewRouter = express.Router();

 reviewRouter.post("/create",createReview);
 reviewRouter.patch("/updateReview/:id", updatedReview);
 reviewRouter.delete("/delete/:id", deleteReview);
 //reviewRouter.get("/details/:id",reviewDetails);
 module.exports = reviewRouter;
