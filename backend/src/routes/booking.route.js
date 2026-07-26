const express =require('express')
const { createBooking, getAllBookings, getOneBooking, updateBooking, deleteBooking } = require('../controllers/booking.controller')
const bookingValidations = require('../middleware/validations/booking')

const router = express.Router()

router.post('/create',bookingValidations,createBooking)
router.get('/get-bookings',getAllBookings)
router.get('/get-booking/:id',getOneBooking)
router.put('/update-booking/:id',updateBooking)
router.delete('/delete-booking/:id',deleteBooking)

module.exports = router 