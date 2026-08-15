import api from "../libraries/api";

const driverService ={
    createDriver(driverData){
        return api.post('/driver/create',driverData)
    },
    getDrivers(){
        return api.get('/driver/get-drivers')
    },
    getDriver(id){
        return api.get(`/driver/get-driver/${id}`)
    },
    updateDriver(id,updatedData){
        return api.put(`/driver/update-driver/${id}`, updatedData)
    },
    deleteDriver(id){
        return api.delete(`/driver/delete-driver/${id}`)
    }
}

export default driverService 