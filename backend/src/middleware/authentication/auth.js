const jwt = require('jsonwebtoken')
const User = require('../../models/user.model')

const auth = async(req,res,next)=>{
    try {

        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:"Authentication Required"})
        }
        const token= authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Authentication Required"})
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        req.user= user 
        next()
        
        
    } catch (error) {
        res.status(500).json({message:"Server Error Occured",error:error.message})
        next(error);

    }
}
 module.exports ={auth}