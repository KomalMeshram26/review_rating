let express = require("express");
let company = require("../controllers/companyController");
let {registerUserValidation} = require("../Validations/company/companyDataValidation");
//let {userAuthentication} = require('../middlewares/authToken');
//let {authorizeAdmin}= require('../middlewares/authontication')
let { companyUpload } = require("../middlewares/companyImageStorage");
let router = express.Router();
router.post("/create", companyUpload.single("profilePic"),registerUserValidation,company.createCompany);
router.get("/list", company.companyList);
router.get("/details/:id", company.companyDetails);
router.get("/findcompanies", company.searchCompaniesByLetter);
//router.get("/findcompanies", company.searchCompaniesByLetter);

module.exports = router;
