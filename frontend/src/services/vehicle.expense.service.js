import api from "../libraries/api"

const vehicleExpenseService = {
    createExpense(expenseData){
        return api.post('/expense/vehicle/create',expenseData)
    },
    getExpenses(userId){
        return api.get('/expesne/vehicle/get-expenses')
    },
    updateExpense(id,updatedData){
        return api.put(`/expense/vehicle/update-expense`,updatedData)
    },
    deleteExpense(id,userId){
        return api.delete(`/expense/vehicle/delete-expense/${id}`,{ params: { userId }})
    }
}

export default vehicleExpenseService 
