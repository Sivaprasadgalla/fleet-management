const Booking = require('../models/booking.model')
const {validationResult} =require('express-validator')

const createBooking = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Fields Required",
                errors:errors.array().map((err)=>err.msg).join(', ')});
        }
       const {userId,customer,vehicle,driver,pickupLocation,dropLocation,pickupDate,returnDate,
        bookingType,totalDistance,totalAmount,paymentStatus,bookingStatus,remarks
       } =req.query;
      const bookingExist = await Booking.findOne({user:userId,driver,vehicle,pickupDate})
      if(bookingExist){
        return res.status(400).json({message:"Driver And Vehicle Already Booked For This Date."})
      }
      const newBooking = await Booking.create({user:userId,customer,vehicle,driver,pickupLocation,dropLocation,pickupDate,returnDate,
        bookingType,totalDistance,totalAmount,paymentStatus,bookingStatus,remarks})
        res.status(201).json({message:"Booking Created Successfully",newBooking})

    } catch (error) {
      res.status(500).json({message:"Server Error Occurred",error:error.message})   
    }
}

const getAllBookings = async(req,res)=>{
    try {
         const {userId}=req.query;
         const getAll = await Booking.find({user:userId})
         res.status(200).json({message:"All Bookings",data:getAll})
    } catch (error) {
        res.status(500).json({message:"Server Error Occurred",error:error.message})
    }
}

const getOneBooking = async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId} =req.query;
        const getOne = await Booking.findById({_id:id,user:userId});
        res.status(200).json({message:"One Booking Details",data:getOne});

    } catch (error) {
        res.status(500).json({message:"Server Error Occurred",error:error.message})
    }
}

const updateBooking = async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId,customer,vehicle,driver,pickupLocation,dropLocation,pickupDate,returnDate,
        bookingType,totalDistance,totalAmount,paymentStatus,bookingStatus,remarks
       } =req.query;
       const updateBook = await Booking.findByIdAndUpdate(
        id,
        {user:userId,customer,vehicle,driver,pickupLocation,dropLocation,pickupDate,returnDate,
        bookingType,totalDistance,totalAmount,paymentStatus,bookingStatus,remarks},
        {new:true}
       )
       res.status(200).json({message:"Booking Details Updated Successfully",data:updateBook})

    } catch (error) {
        res.status(500).json({message:"Server Error Occurred",error:error.message})
    }
}

const deleteBooking = async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId}=req.query;
        const deleteBook = await Booking.findByIdAndDelete({_id:id,user:userId})
        res.status(200).json({message:"Booking Deleted Successfully"})

    } catch (error) {
        res.status(500).json({message:"Server Error Occurred",error:error.message})
    }
}

module.exports ={createBooking,getAllBookings,getOneBooking,updateBooking,deleteBooking}
