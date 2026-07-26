const  {body} =require('express-validator')

const vehicleValidation =[
    body('registerNumber')
    .notEmpty()
    .withMessage("Register Number Is Required"),
    body('brand')
    .notEmpty()
    .withMessage("Vehicle Model Is Required"),
    body('year')
    .notEmpty()
    .withMessage('Year Is Required'),
    body('fuelType')
    .notEmpty()
    .withMessage("Fuel Type Is Required"),
    body('seatCapacity')
    .notEmpty()
    .withMessage("Seat Capacity Is Required"),
    body('InsuranceNumber')
    .notEmpty()
    .withMessage("Insurance Number Is Required"),
    body('InsuranceExpiry')
    .notEmpty()
    .withMessage("Insurance Expiry Is Required")
     .isDate()
    .withMessage("select valid date"),
    body('PermitExpiry')
    .notEmpty()
    .withMessage("Permit Expiry Is Required"),
    body('status')
    .notEmpty()
    .withMessage("Status Is Required")
]

module.exports = vehicleValidation