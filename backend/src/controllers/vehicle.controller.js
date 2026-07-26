const Vehicle = require('../models/vehicle.model')
const {validationResult} =require('express-validator')

const createVehicle = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({message:"All Fields Are Required",
            errors:errors.array().map((err)=>err.msg).join(', ')})
        }
        const {userId,registerNumber,brand,year,type,fuelType,seatCapacity,InsuranceNumber,InsuranceExpiry,
            PermitExpiry,status
        } =req.body;
       const vehicleExist = await Vehicle.findOne({user:userId,registerNumber})
       if(vehicleExist){
         return res.status(400).json({message:"Vehicle Already Exist"})
       }
       const newVechile = await Vehicle.create({user:userId,registerNumber,brand,year,type,fuelType,seatCapacity,InsuranceNumber,InsuranceExpiry,
            PermitExpiry,status})
        res.status(201).json({message:"Vehicle Registered Successfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const getAllVehicles =async(req,res)=>{
try {
       const {userId} =req.body;
    const getAll = await Vehicle.find({user:userId})
    res.status(200).json({message:"All Vehicle Details",data:getAll}) 
} catch (error) {
    res.status(500).json({message:"Server Error Occured",error:error.message})
}
    
}

const getOneVehicle =async(req,res)=>{
    try {
        const {userId} = req.body;
        const {id} =req.params;
        const getOne = await Vehicle.findOne({_id:id,user:userId})
        res.status(200).json({message:"One Vehicle Details",data:getOne})
        
    } catch (error) {
         res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const updateVehicle = async(req,res)=>{
    try {
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Feilds Are Required",
                errors:errors.array().map((err)=>err.msg).join(', ')});
        }
        const {id} =req.params;
        const {userId,registerNumber,brand,year,type,fuelType,seatCapacity,InsuranceNumber,InsuranceExpiry,
            PermitExpiry,status
        } =req.body;
        const updateOne = await Vehicle.findByIdAndUpdate(
            id,
            {user:userId,registerNumber,brand,year,type,fuelType,seatCapacity,InsuranceNumber,InsuranceExpiry,
            PermitExpiry,status},
            {new:true}
        );
        res.status(200).json({message:"Vehicle Details Updated Successfully",data:updateOne})

    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const deleteVehicle = async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId} =req.body;
        const deleteOne = await Vehicle.findByIdAndDelete({_id:id,user:userId});
        res.status(200).json({message:"Vehicle Deleted Successfully"});
    } catch (error) {
         res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}
module.exports ={createVehicle,getAllVehicles,getOneVehicle,updateVehicle,deleteVehicle}