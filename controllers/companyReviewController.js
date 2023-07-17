const companyReviewSchema = require("../models/companyReviewSchema");
const companySchema = require("../models/companySchema");

const createReview = async (req, res) => {
  const reviewData = new companyReviewSchema(req.body);

  try {
    await reviewData.save();

    res.status(200).json({
      sucess: true,
      message: "Review added succesfully",
      review: reviewData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occur ${error.meesage}`,
    });
  }
};
const updatedReview = async (req, res) => {
  let id = req.params.id;
  console.log(req.params.id, req.body);
  try {
    let updatedReview = await companyReviewSchema.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.status(202).send({
      success: true,
      message: "review updated succesfully",
      update: updatedReview,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
};

const deleteReview = async (req, res) => {
  let id = req.params.id;
  try {
    let deleteRev = await companyReviewSchema.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.status(202).json({
      success: true,
      message: "review deleted successfully",
      deleterev: deleteRev,
    });
  } catch (errro) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

//company review details

module.exports = {
  createReview,
  updatedReview,
  deleteReview,
};
