const {body} =require('express-validator')

const customerValidation =[
    body('firstName')
    .notEmpty()
    .withMessage("First Name Is Required"),
    body('lastName')
    .notEmpty()
    .withMessage('Last Name Is Required'),
    body('phoneNumber')
    .notEmpty()
    .withMessage('Phone Number Is Required')
    .isLength({min:10,max:10})
    .withMessage('Phone Number Must Be 10 Characters'),
    body('email')
    .notEmpty()
    .withMessage('Email Is Required')
    .isEmail()
    .withMessage('Enter Valid Email').normalizeEmail(),
    body('address')
    .notEmpty()
    .withMessage('Address Required'),
    body('city')
    .notEmpty()
    .withMessage('City Required'),
    body('state')
    .notEmpty()
    .withMessage('State Required'),
    body('pincode')
    .notEmpty()
    .withMessage('PinCode Required'),
    body('companyName')
    .notEmpty()
    .withMessage('Company Name Is Required'),
    body('customerType')
    .notEmpty()
    .withMessage('Customer Type Is Required'),
    body('status')
    .notEmpty()
    .withMessage('Status Required')
]

module.exports = customerValidation