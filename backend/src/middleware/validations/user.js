const {body} = require('express-validator')

const registerValidation =[
    body('firstName')
    .notEmpty()
    .withMessage("First Name is required"),
    body('lastName')
    .notEmpty()
    .withMessage("Last Name is required"),
     body('phoneNumber')
    .notEmpty()
    .withMessage("Phone Number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone Number must be 10 characters"),
    body('email')
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid email").normalizeEmail(),
    body('password')
    .notEmpty()
    .withMessage("Password is required")
    .isLength(8)
    .withMessage("Password must be 8 characters"),
   
  
]

const loginValidation =[
    body('email')
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid email").normalizeEmail(),
    body('password')
    .notEmpty()
    .withMessage("Password is required")
    .isLength(8)
    .withMessage("Password must be 8 characters"),
]

module.exports ={registerValidation,loginValidation}