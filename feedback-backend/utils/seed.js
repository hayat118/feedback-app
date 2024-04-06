const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

const seed = async () => {
  const admins = await Employee.find({ role: "admin" });
  if (admins.length == 0) {
    console.log("Admins not found!");
    const hashedPassword = await bcrypt.hash("abcd1234", 10);
    await Employee.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });
  }
};

module.exports = seed;
