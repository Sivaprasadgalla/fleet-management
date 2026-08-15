import api from "../libraries/api"

const customerService ={
    createCustomer(customerData){
        return api.post('/customer/create',customerData);
    },
    getCustomers(){
        return api.get('/customer/get-customers');
    },
    getCustomer(id){
        return api.get(`/customer/get-customer/${id}`);
    },
    updateCustomer(id,updatedData){
        return api.put(`/customer/update-customer/${id}`,updatedData)
    },
    deleteCustomer(id){
        return api.delete(`/customer/delete-customer/${id}`)
    }
}

export default customerService