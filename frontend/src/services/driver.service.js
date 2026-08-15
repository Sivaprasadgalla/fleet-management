import api from "../libraries/api";

const driverService ={
    createDriver(driverData){
        return api.post('/driver/create',driverData)
    },
    getDrivers(userId){
        return api.get('/driver/get-drivers', { params: { userId } })
    },
    getDriver(id){
        return api.get(`/driver/get-driver/${id}`)
    },
    updateDriver(id,updatedData){
        return api.put(`/driver/update-driver/${id}`, updatedData)
    },
    deleteDriver(id, userId){
        return api.delete(`/driver/delete-driver/${id}`, { params: { userId } })
    }
}

export default driverService 
