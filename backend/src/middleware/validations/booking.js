const {body} =require('express-validator')
const mongoose =require('mongoose')

const bookingValidations =[
    body('userId')
    .notEmpty()
    .withMessage('User Id Required')
    .bail()
    .custom((value)=>mongoose.Types.ObjectId.isValid(value))
    .withMessage("Enter Valid User Id"),
    body('customer')
    .notEmpty()
    .withMessage('Customer Id Required')
    .bail()
    .custom((value)=>mongoose.Types.ObjectId.isValid(value))
    .withMessage("Enter Valid Customer Id"),
     body('vehicle')
    .notEmpty()
    .withMessage('Vehicle Id Required')
    .bail()
    .custom((value)=>mongoose.Types.ObjectId.isValid(value))
    .withMessage("Enter Valid Vehicle Id"),
    body('driver')
    .notEmpty()
    .withMessage('Driver Id Required')
    .bail()
    .custom((value)=>mongoose.Types.ObjectId.isValid(value))
    .withMessage("Enter Valid Driver Id"),
    body('pickupLocation')
    .notEmpty()
    .withMessage('Enter Pick Up Location'),
    body('dropLocation')
    .notEmpty()
    .withMessage('Drop Location Required'),
    body('pickupDate')
    .notEmpty()
    .withMessage('Pick Up Date Required'),
    body('totalAmount')
    .notEmpty()
    .withMessage('Total Amount Field Required'),

]

module.exports = bookingValidations
   

   

   
  

   
   
    
   

