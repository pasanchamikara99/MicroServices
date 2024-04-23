const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  bookID: {  // Changed from 'BookId' to 'bookID'
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,  // Assuming a minimum rating of 1
    max: 5,  // Assuming a maximum rating of 5
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Defaults to the current date/time when not provided
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
