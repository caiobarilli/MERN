const { validationResult } = require("express-validator");

/**
 * @desc   Validates the request body
 * @param  {Array} validations - Array of validations
 * @return {Function} - Returns a middleware function
 */
const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = validate;
