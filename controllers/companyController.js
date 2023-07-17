const companyReviewSchema = require("../models/companyReviewSchema");
let companySchema = require("../models/companySchema");
const { unlinkSync } = require("fs");

module.exports = {
  createCompany: async (req, res) => {
    try {
      let isCompanyExists = await companySchema.findOne({
        companyName: req.body.companyName,
      });
      if (isCompanyExists) {
        req.file ? unlinkSync(req.file.path) : null; //agar same name ki company ho to profile pic upload na ho
        res.status(409).json({
          success: false,
          message: "Company is already exist",
        });
      } else {
        let addCompany = new companySchema(req.body);
        const filePath = `/uploads/company/${req.file.filename}`;
        addCompany.profilePic = filePath;
        let company = await addCompany.save();
        res.status(201).json({
          success: true,
          message: "Company added successfully",
          company: company,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Error occur ${error.message}`,
      });
    }
  },

  //company details
  companyList: async (req, res) => {
    try {
      let companys = await companySchema.find();
      let totalCompanies = await companySchema.find().count();
      res.status(200).json({
        success: true,
        message: "All companies list",
        totalCompanies: totalCompanies,
        companys: companys,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  },

  //company review details
companyDetails : async (req, res) => {
  try {
    const companyData = await companySchema.findById(req.params.id);
    const reviewDataList = await companyReviewSchema  
     .find({ companyID: req.params.id })
      .populate({ path: "userID", select: "userName profilPic" });
    res.status(200).json({
      success: true,
      message: "Review list fetched successfully",
      company: companyData,
      review: reviewDataList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
},

  //Get company name by letters
  searchCompaniesByLetter: async (req, res) => {
    try {
      let companyName = req.body.companyName;
      console.log(companyName);
      let companies = await companySchema.find({
        companyName: { $regex: `^${companyName}`, $options: "i" },
      });
      if (companies.length > 0) {
        res.status(200).json({
          success: true,
          message: "Company found successfully",
          companies: companies,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Companys are not founds ",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Error occur ${error.message}`,
      });
    }
  },
};
