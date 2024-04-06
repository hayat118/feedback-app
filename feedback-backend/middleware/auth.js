const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const SECRET_KEY = "1z`=TZ?fu12_";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token == null) {
      return res.sendStatus(401);
    }

    const payload = jwt.verify(token, SECRET_KEY);
    console.log(payload);

    const user = await Employee.findById(payload.userId);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

module.exports = authenticateToken;
