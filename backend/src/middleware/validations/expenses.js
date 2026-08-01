const {body} =require('express-validator')

const expenseValidator =[
    body('expenseName')
    .notEmpty()
    .withMessage('Expense Name Is Required'),
    body('date')
    .notEmpty()
    .withMessage('Date Is Required'),
    body('amount')
    .notEmpty()
    .withMessage('Amount Is Required')
]

module.exports = expenseValidator