const mongoose =require('mongoose')

const driverSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        index: true 
    },
    firstName :{
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
        unique:true
    },
    phoneNumber :{
        type:String,
        required:true,
        unique:true,
        minLength:10
    },
    licenseNumber:{
        type:String,
        required:true
    },
    licenseExpiry:{
        type:Date,
        required:true 
    },
    status:{
        type:String,
        required:true,
        enum:['Available','Assigned','InActive'],
        default:"Available"
    }

},{timestamps : true})


module.exports = mongoose.model("Driver",driverSchema)