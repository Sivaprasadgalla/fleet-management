import api from "../libraries/api"

const vehicleExpenseService = {
    createExpense(expesneData){
        return api.post('/expense/vehicle/create',expesneData)
    },
    getExpenses(){
        return api.get('/expesne/vehicle/get-expenses')
    },
    updateExpense(id,updatedData){
        return api.put(`/expense/vehicle/update-expense`,updatedData)
    },
    deleteExpense(id){
        return api.delete(`/expense/vehicle/delete-expense/${id}`)
    }
}

export default vehicleExpenseService 
