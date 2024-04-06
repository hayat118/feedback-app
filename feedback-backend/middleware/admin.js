const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const SECRET_KEY = "1z`=TZ?fu12_";

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) {
    return res.sendStatus(401);
  }

  const payload = jwt.verify(token, SECRET_KEY);

  const user = await Employee.findById(payload.userId);

  console.log(user);
  if (user.role !== "admin") {
    return res.sendStatus(401);
  }

  req.user = user;
  next();
};

module.exports = authenticateAdmin;
