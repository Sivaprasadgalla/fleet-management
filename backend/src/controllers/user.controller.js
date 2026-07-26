const User =require('../models/user.model')
const bcrypt =require('bcryptjs')
const {validationResult} =require('express-validator')
const jwt =require('jsonwebtoken')

const register =async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"All Fileds Are Required",
                errors:errors.array().map((err)=>err.msg).join(", ")})
        } 
        const {firstName,lastName,email,password,phoneNumber,role,status} =req.body;
        const userExist = await User.findOne({email})
        if(userExist){
           return res.status(400).json({message:"User Already Exist"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({firstName,lastName,email,password:hashPassword,phoneNumber,role,status})
        res.status(201).json({message:"User Registered Successfully"})
        
    } catch (error) {
        res.status(500).json({message:"Server error occured",error:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Validation Error",
                errors:errors.array().map((err)=>err.msg).join(", ")
            })
        }
        const {email,password} =req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Doesnt exist.Please Register"})
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({message:"Invalid Password"})
        }
        user.lastLogin = new Date();
        await user.save();
        const accessToken = jwt.sign({
            userId : user._id,
            email:user.email 
        },
           process.env.JWT_SECRET,
        {expiresIn :"1hr"})
        res.status(201).json({message:"LoggedIn Successfully",
            user:{userId:user._id,email,role:user.role,lastLogin:user.lastLogin},accessToken})
    } catch (error) {
       res.status(500).json({message:"Server error occured",error:error.message})   
    }
}
module.exports ={register,login}