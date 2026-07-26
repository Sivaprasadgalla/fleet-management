const mongoose =require('mongoose')

const vehicleSchema =new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User',
    index:true 
   },
   registerNumber:{
     type:String,
     required:true 
   },
   brand:{
     type:String,
     required:true 
   },
   year:{
    type:Date,
    required:true
   },
   type:{
      type:String,
      required:true,
      enum:['car','truck','van','bus'],
      default:'car'
   },
   fuelType:{
     type:String,
     required:true,
     enum:['diesel','petrol','electric','hybrid'],
     default:'diesel'
   },
   seatCapacity:{
        type:Number,     
   },
   InsuranceNumber:{
      type:String,
      required:true 
   },
   InsuranceExpiry:{
        type:Date,
        required:true 
   },
   PermitExpiry:{
     type:Date,
     required:true
   },
   status:{
    type:String,
    required:true,
    enum:['available','booked','inactive','maintainance'],
    default:'available'
    },
   
},{timestamps:true})

module.exports =mongoose.model('Vehicle',vehicleSchema)