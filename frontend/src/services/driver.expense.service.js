import api from "../libraries/api"

const driverExpenseService = {
    createExpense(expesneData){
        return api.post('/expense/driver/create',expesneData)
    },
    getExpenses(userId){
        return api.get('/expesne/driver/get-expenses',{ params: { userId }})
    },
    updateExpense(id,updatedData){
        return api.put(`/expense/driver/update-expense`,updatedData)
    },
    deleteExpense(id,userId){
        return api.delete(`/expense/driver/delete-expense/${id}`,{ params: { userId }})
    }
}

export default driverExpenseService 
