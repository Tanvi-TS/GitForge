const mongoose = require("mongoose");
const CustomError = require("../utils/customError");

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return next(new CustomError(`${paramName} is invalid`, 400));
    }
    next();
  };
};

module.exports = validateObjectId;
