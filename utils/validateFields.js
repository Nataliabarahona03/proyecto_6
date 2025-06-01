const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        param: err.param,
        msg: err.msg
      })),
    });
  }
  next();
};

module.exports = validateFields;