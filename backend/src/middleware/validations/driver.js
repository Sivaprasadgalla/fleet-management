const {body} =require('express-validator')
const mongoose =require('mongoose')

const validation =[
    body('userId')
    .notEmpty()
    .withMessage("userId Required")
    .bail()
    .custom((value)=>mongoose.Types.ObjectId.isValid(value))
    .withMessage("invalid userId"),
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
    body('licenseNumber')
    .notEmpty()
    .withMessage("License Number is required"),
    body('licenseExpiry')
    .notEmpty()
    .withMessage("Enter License Expiry Date")
    .isDate()
    .withMessage("select valid date")
]


module.exports ={validation}