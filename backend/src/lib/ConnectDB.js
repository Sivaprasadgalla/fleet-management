const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("Databse connected succesfully!")
        
    } catch(err){
        console.log(`Database connection error - ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDB