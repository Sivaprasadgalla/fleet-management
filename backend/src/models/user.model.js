const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true 
    },
    lastName:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        minLength:10
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active' 
    },
    profilePhoto:{
        type:String,
        default:null
    },
    lastLogin:{
        type:Date,
        default:null 
    }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema, 'users')
