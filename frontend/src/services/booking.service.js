import api from "../libraries/api"

const bookingService = {
    createBooking(bookingData){
        return api.post('/booking/create',bookingData);
    },
    getBookings(userId){
        return api.get('/booking/get-bookings',{ params: { userId }});
    },
    getBooking(id){
        return api.get(`/booking/get-booking/${id}`)
    },
    updateBooking(id,updatedData){
        return api.put(`/booking/update-booking/${id}`,updatedData);
    },
    deleteBooking(id,userId){
        return api.delete(`/booking/delete-booking/${id}`,{ params: { userId }})
    }
}

export default bookingService