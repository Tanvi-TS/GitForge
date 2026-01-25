const CustomError = require("../utils/customError");

const validateBody = (requiredFields) => {
  return (req, res, next) => {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return next(new CustomError(`${field} is required`, 400));
      }
    }
    next();
  };
};

module.exports = validateBody;
