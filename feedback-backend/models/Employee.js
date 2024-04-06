const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  password: { type: String, required: true },
  performance: { type: Number, default: 0 },
  feedbacks: [{ type: String }],
});
module.exports = mongoose.model("Employee", employeeSchema);
