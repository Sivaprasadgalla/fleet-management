const { createCustomer, getAllCustomers, getOneCustomer, updateCustomer, deleteCustomer } =require('../controllers/customer.controller')
const express =require('express');
const customerValidation = require('../middleware/validations/customer');

const router = express.Router();

router.post('/create',customerValidation,createCustomer)
router.get('/get-customers',getAllCustomers)
router.get('/get-customer/:id',getOneCustomer)
router.put('/update-customer/:id',customerValidation,updateCustomer)
router.delete('/delete-customer/:id',deleteCustomer)

module.exports = router 
