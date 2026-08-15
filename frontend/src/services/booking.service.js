import api from "../libraries/api"

const bookingService = {
    createBooking(bookingData){
        return api.post('/booking/create',bookingData);
    },
    getBookings(){
        return api.get('/booking/get-bookings');
    },
    getBooking(id){
        return api.get(`/booking/get-booking/${id}`)
    },
    updateBooking(id,updatedData){
        return api.put(`/booking/update-booking/${id}`,updatedData);
    },
    deleteBooking(id){
        return api.delete(`/booking/delete-booking/${id}`)
    }
}

export default bookingService