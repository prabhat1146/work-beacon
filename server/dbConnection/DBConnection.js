const mongoose=require("mongoose")
const dotenv = require("dotenv")
const DB_URI = process.env.MONGODB_URI
// console.log(DB_URI)
const connectDB = async()=>{
    try{
        // console.log(DB_URI)
       const dbConnection= await mongoose.connect(DB_URI)
        console.log("database is connected")
        return dbConnection
    }
    catch{
        console.log("database is not connected");
    }
}

module.exports=connectDB