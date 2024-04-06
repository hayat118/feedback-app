const mongoose = require("mongoose");

const performanceReviewSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, default: Date.now },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
});

module.exports = mongoose.model("PerformanceReview", performanceReviewSchema);
