const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid request!");
    error.statusCode = 422;
    error.data = errors.array();
    // return res.status(200);
    throw error;
  }
  next();
};
