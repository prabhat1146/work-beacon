const express=require("express")
const dotenv=require("dotenv").config()
const cookieParser=require("cookie-parser")
// dotenv.config()
const cors=require("cors")
const  usersRouter =require("./routes/users.js")
const connectDB = require("./dbConnection/DBConnection.js")
const mongoose  = require("mongoose")

const app=express()
app.use(cookieParser())
app.use(cors({origin:'http://localhost:3000',credentials: true}))
// app.options('*',cors({origin:'http://localhost:3000'},{credentials: true}))
app.use(express.json())
const port=process.env.PORT || 3000

app.use("/users",usersRouter)
const dbConnection=connectDB()




app.listen(port,()=>{
    console.log("server is running on port: ",port)
})