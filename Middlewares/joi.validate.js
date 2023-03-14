const joi = require("joi");

const validateUserSignup = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    emailAddress: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    phoneNumber: joi.string().required(),
    password: joi.string().required().min(5).max(12).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: joi.string().required(),
})

const validateUserLogin = joi.object({
    phoneNumber: joi.string().required(),
    password: joi.string().required().min(5).max(12).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})


module.exports = {validateUserSignup, validateUserLogin}