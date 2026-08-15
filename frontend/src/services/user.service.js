import api from "../libraries/api"

const userService ={
    login(loginData){
        return api.post(`/user/login`, loginData);
    },
    register(registerdData){
        return api.post(`/user/register`, registerdData);
    },
    changePassword(data){
        return api.post('/user/change-password',data);
    },
    getUsers(){
        return api.get(`/user/all-users`);
    },
    getOneUser(id){
        return api.get(`/user/get-profile/${id}`);
    },
    createUser(userData){
        return api.post(`/user/create`,userData);
    },
    updateUser(updatedData){
        return api.put(`/user/update-profile`,updatedData);
    },
    deleteUser(id){
        return api.delete(`/user/delete-user/${id}`);
    }
    
}

export default userService;





