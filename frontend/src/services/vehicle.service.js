import api from "../libraries/api"

const vehicleService = {
    createVehicle(vehicleData){
        return api.post('/vehicle/create',vehicleData)
    },
    getVehicles(){
       return api.get('/vehicle/get-vehicles')
    },
    getVehicle(id){
        return api.get(`/vehicle/get-vehicle/${id}`)
    },
    updateVehicle(id,updateData){
        return api.put(`/vehicle/update-vehicle/${id}`, updateData)
    },
    deleteVehicle(id){
        return api.delete(`/vehicle/delete-vehicle/${id}`)
    }
} 

export default vehicleService
