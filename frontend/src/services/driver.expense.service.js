import api from "../libraries/api"

const driverExpenseService = {
    createExpense(expesneData){
        return api.post('/expense/driver/create',expesneData)
    },
    getExpenses(){
        return api.get('/expesne/driver/get-expenses')
    },
    updateExpense(id,updatedData){
        return api.put(`/expense/driver/update-expense`,updatedData)
    },
    deleteExpense(id){
        return api.delete(`/expense/driver/delete-expense/${id}`)
    }
}

export default driverExpenseService 
