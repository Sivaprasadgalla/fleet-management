const Driver =require('../models/driver.model')
const {validationResult} =require('express-validator')

const createDriver =async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Fields Are Required",
                errors:errors.array().map((err)=>err.msg).join(', ')
            })
        }
        const {userId,firstName,lastName,phoneNumber,email,licenseNumber,licenseExpiry,status} =req.query;
        const driverExits = await Driver.findOne({user:userId,email})
        if(driverExits){
            return res.status(400).json({message:"Driver Already Exist!!"})
        }
        const newDriver = await Driver.create({user:userId,firstName,lastName,phoneNumber,email,licenseNumber,licenseExpiry,status})
        res.status(201).json({message:"Driver Created Successfully"})

    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const getAllDrivers = async(req,res)=>{
    try {
        const {userId} =req.query;
        const allDrivers = await Driver.find({user:userId})
        res.status(200).json({message:"All Driver Details",data:allDrivers})
    } catch (error) {
         res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const getOneDriver =async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId} =req.query;
        const getOne = await Driver.findOne({_id:id,user:userId})
        res.status(200).json({message:"One Driver Details",data:getOne})
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}

const updateDriver =async(req,res)=>{
    try {
         const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Fields Are Required",
                errors:errors.array().map((err)=>err.msg).join(', ')
            })
        }
       const {id} =req.params;
    const {userId,firstName,lastName,phoneNumber,email,licenseNumber,licenseExpiry,status} =req.query;
    const update = await Driver.findByIdAndUpdate(
        id,
        {user:userId,firstName,lastName,phoneNumber,email,licenseNumber,licenseExpiry,status},
        {new:true} 
    );
    res.status(200).json({message:"Driver Details Updated Successfully",data:update})    
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
    
}

const deleteDriver = async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId} =req.query;
        const deleteDriverDetail = await Driver.findByIdAndDelete({_id:id, user:userId})
        res.status(200).json({message:"Driver Details Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}
module.exports ={createDriver,getAllDrivers,getOneDriver,updateDriver,deleteDriver}