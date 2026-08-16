import api from "../libraries/api"

const vehicleService = {
    createVehicle(vehicleData){
        return api.post('/vehicle/create',vehicleData)
    },
    getVehicles(userId){
       return api.get('/vehicle/get-vehicles/',{params: { userId }})
    },
    getVehicle(id){
        return api.get(`/vehicle/get-vehicle/${id}`)
    },
    updateVehicle(id,updateData){
        return api.put(`/vehicle/update-vehicle/${id}`, updateData)
    },
    deleteVehicle(id, userId){
        return api.delete(`/vehicle/delete-vehicle/${id}`,{ params: { userId }})
    }
} 

export default vehicleService
