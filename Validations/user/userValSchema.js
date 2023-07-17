const joi = require('joi')
const {joiPasswordExtendCore} = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
  registerUser: joi.object({
      userName: joi
        .string()
        .max(20)
        .min(3)
        .message({
          "string.min": "{#label} should contains at least {#limit} charaters",
          "string.max": "{#label} should contains at least {#limit} charaters",
        })
        .required(),
      userEmail: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),
    userPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required()
        .messages({
          "userPassword.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "userPassword.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "userPassword.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "userPassword.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "userPassword.noWhiteSpaces": "{#label} should not contain white spaces",
          "userPassword.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        }),
      userPhone: joi
        .number()
        .integer()
        .min(100000000)
        .max(9999999999)
        .message("invalid mobile no")
        .required(),
      userCity: joi.string().required(),
      userState: joi.string().required(),
    })
    .unknown(true),

    loginUser: joi.object({
        userEmail: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),

        userPassword: joi
        
        .required(),
    }),
    //reset validation
  resetPassword: joi.object({
  newPassword: joiPassword
  .string()
  .minOfSpecialCharacters(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .required()
  .messages({
    "userPassword.minOfUppercase":
      "{#label} should contain at least {#min} uppercase character",
    "userPassword.minOfSpecialCharacters":
      "{#label} should contain at least {#min} special character",
    "userPassword.minOfLowercase":
      "{#label} should contain at least {#min} lowercase character",
    "userPassword.minOfNumeric":
      "{#label} should contain at least {#min} numeric character",
    "userPassword.noWhiteSpaces": "{#label} should not contain white spaces",
    "userPassword.onlyLatinCharacters":
      "{#label} should contain only latin characters",
  }),
  conformPassword: joiPassword
  .string()
  .minOfSpecialCharacters(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .required()
  .messages({
    "userPassword.minOfUppercase":
      "{#label} should contain at least {#min} uppercase character",
    "userPassword.minOfSpecialCharacters":
      "{#label} should contain at least {#min} special character",
    "userPassword.minOfLowercase":
      "{#label} should contain at least {#min} lowercase character",
    "userPassword.minOfNumeric":
      "{#label} should contain at least {#min} numeric character",
    "userPassword.noWhiteSpaces": "{#label} should not contain white spaces",
    "userPassword.onlyLatinCharacters":
      "{#label} should contain only latin characters",
  }),
 }).unknown(true)
}

module.exports = schema;
