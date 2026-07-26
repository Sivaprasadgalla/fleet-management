const express =require('express')
const vehicleValidation = require('../middleware/validations/vehicle')
const { createVehicle, getAllVehicles, getOneVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicle.controller')

const router =express.Router()

router.post('/create',vehicleValidation,createVehicle)
router.get('/get-vehicles',getAllVehicles)
router.get('/get-vehicle/:id',getOneVehicle)
router.put('/update-vehicle/:id',updateVehicle)
router.delete('/delete-vehicle/:id',deleteVehicle)

module.exports = router 