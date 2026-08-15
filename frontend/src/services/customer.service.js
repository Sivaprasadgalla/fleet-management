import api from "../libraries/api"

const customerService ={
    createCustomer(customerData){
        return api.post('/customer/create',customerData);
    },
    getCustomers(userId){
        return api.get('/customer/get-customers', { params: { userId } });
    },
    getCustomer(id){
        return api.get(`/customer/get-customer/${id}`);
    },
    updateCustomer(id,updatedData){
        return api.put(`/customer/update-customer/${id}`,updatedData)
    },
    deleteCustomer(id, userId){
        return api.delete(`/customer/delete-customer/${id}`, { params: { userId } })
    }
}

export default customerService
