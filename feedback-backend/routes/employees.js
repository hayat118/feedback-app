var express = require("express");
const { route } = require(".");
const Employee = require("../models/Employee");
const User = require("../models/User");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/auth");
const authenticateAdmin = require("../middleware/admin");

// Move this to .env
const SECRET_KEY = "1z`=TZ?fu12_";
//
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {});

    // Return token to client
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Employee.findOne({ email });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/identify", authenticateToken, async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

// create an emplyee
router.post("", authenticateAdmin, async (req, res) => {
  try {
    const { name, email, role, password, performance } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      role,
      performance,
      password: hashedPassword,
    });
    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
    console.log(newEmployee, "newss");
  } catch (error) {
    // Handle errors
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all employees
router.get("", async (req, res) => {
  try {
    // Query the database to retrieve all employees
    const employees = await Employee.find();

    // Return the list of employees as a JSON response
    res.status(200).json(employees);
  } catch (error) {
    // Handle errors
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// delete employee
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get single employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update employee
router.put("/:id", authenticateAdmin, async (req, res) => {
  const id = req.params.id;
  const { name, email, performance } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, performance },
      { new: true }
    );
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add feedback to employee
router.post("/:id/feedbacks", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { feedback } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.feedbacks.push(feedback);
    await employee.save();

    res.status(201).json({ message: "Feedback added successfully" });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
