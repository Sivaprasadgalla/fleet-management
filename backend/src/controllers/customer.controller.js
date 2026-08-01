const Customer = require('../models/customer.model')
const {validationResult} = require('express-validator')

const createCustomer = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Fields Are Required",
                errors:errors.array().map((err)=>err.msg).join(', ')});
        }
        const {userId,firstName,lastName,phoneNumber,email,
            address,city,state,pincode,companyName,customerType, status} =req.body;
        const userExist = await Customer.findOne({user:userId,phoneNumber})
        if(userExist){
            return res.status(400).json({message:"Customer Already Exist"})
        }
        const newCustomer =await Customer.create({
            user:userId,firstName,lastName,phoneNumber,email,
            address,city,state,pincode,companyName,customerType, status
        })
        res.status(201).json({message:"Customer Added Successfully!!",data:newCustomer})
    } catch (error) {
      res.status(500).json({message:"Server Error Occured",error:error.message})   
    }
}

const getAllCustomers = async(req,res)=>{
    try {
        const {userId} =req.query;
        const getAll = await Customer.find({user:userId});
        res.status(200).json({message:"All Customers Details",data:getAll})
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})  
    }
}

const getOneCustomer = async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId} =req.query;
        const getOne = await Customer.findOne({_id:id,user:userId})
        res.status(200).json({message:"One Customer Details",data:getOne})
    } catch (error) {
         res.status(500).json({message:"Server Error Occured",error:error.message})  
    }
}

const updateCustomer = async(req,res)=>{
    try {
         const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Fields Are Required",
                errors:errors.array().map((err)=>err.msg).join(', ')});
        }
        const {id}=req.params;
        const {userId,firstName,lastName,phoneNumber,email,
            address,city,state,pincode,companyName,customerType, status} =req.body;
        const updateOne = await Customer.findByIdAndUpdate(
            id,
            {user:userId,firstName,lastName,phoneNumber,email,
            address,city,state,pincode,companyName,customerType, status},
            {new:true}
        );
        res.status(200).json({message:"Customer Details Updated Successfully",data:updateOne})
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})  
    }
}

const deleteCustomer = async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId} =req.query;
        const deleteOne = await Customer.findByIdAndDelete({_id:id,user:userId})
        res.status(200).json({message:"Customer Deleted Successfully"})

    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
    }
}
module.exports ={createCustomer,getAllCustomers,getOneCustomer,updateCustomer,deleteCustomer}



    
    
   