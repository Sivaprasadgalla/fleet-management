const express=require('express')
const { createExpense, getExpense, updateExpense, deleteExpense } = require('../controllers/driver.expenses.controller');
const { createVehicleExpense, getVehicleExpense, updateVehicleExpense, deleteVehicleExpense } = require('../controllers/vehicle.expenses.controller');

const router=express.Router()

router.post('/driver/create',createExpense);
router.get('/driver/get-expenses',getExpense)
router.put('/driver/update-expense',updateExpense)
router.delete('/driver/delete-expense/:id',deleteExpense)

router.post('/vehicle/create',createVehicleExpense);
router.get('/vehicle/get-expenses',getVehicleExpense)
router.put('/vehicle/update-expense',updateVehicleExpense)
router.delete('/vehicle/delete-expense/:id',deleteVehicleExpense)

module.exports = router 