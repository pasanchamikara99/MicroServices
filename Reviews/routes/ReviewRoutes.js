const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/ReviewController");

router.get("/getreview/:id", reviewController.getReview);
router.get("/getallreviews", reviewController.getAllReviews);
router.delete("/deletereview/:id", reviewController.deleteReview);
router.post("/addreview", reviewController.addReview);

module.exports = router;
