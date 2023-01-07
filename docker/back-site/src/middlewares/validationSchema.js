const Joi = require("joi");

module.exports = {
  postSignupValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error !== undefined) {
      return res.status(400).json({
        contentType: "application/json",
        ResponseBody: validationResult.error.details,
      });
    }
    next();
  },
  postLoginValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().required(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error !== undefined) {
      return res.status(400).json({
        contentType: "application/json",
        ResponseBody: validationResult.error.details,
      });
    }
    next();
  },
};
