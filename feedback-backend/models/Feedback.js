const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  performanceReviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PerformanceReview",
    required: true,
  },
  feedbackText: { type: String, required: true },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
