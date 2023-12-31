const companyReviewSchemaVal = require("./companyReviewSchemaVal");

module.exports = {
  addCompanyReviewDataValidation: async (req, res, next) => {
    let isValid = await companyReviewSchemaVal.createReview.validate(req.body, {
      isEarly: false,
    });
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
