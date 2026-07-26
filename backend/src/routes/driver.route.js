const {createDriver, getAllDrivers, getOneDriver, updateDriver, deleteDriver} =require('../controllers/driver.controller')
const express = require('express')
const { validation } = require('../middleware/validations/driver')

const router =express.Router()

router.post('/create',validation,createDriver)
router.get('/get-drivers',getAllDrivers)
router.get('/get-driver/:id',getOneDriver)
router.put('/update-driver/:id',validation,updateDriver)
router.delete('/delete-driver/:id',deleteDriver)

module.exports = router