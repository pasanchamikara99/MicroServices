const express = require("express");
const app = express();
const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const result = await review.save();
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReview = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findById(id);
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find();

  if (reviews.length > 0) {
    res.status(200).json(reviews);
  } else {
    res.status(404).json({ error: "No reviews found" });
  }
};

const deleteReview = async (req, res) => {
  const id = req.params.id;

  Review.findByIdAndDelete(id)
    .then((review) => {
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addReview,
  getReview,
  getAllReviews,
  deleteReview,
};
