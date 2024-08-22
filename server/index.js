const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const usersRouter = require("./routes/users.js");
const connectDB = require("./dbConnection/DBConnection.js");

const app = express();
const APP_URL = process.env.APP_URL || 'http://localhost:3000';  // Client URL
const PORT = process.env.PORT || 5000;  // Server port

app.use(cookieParser());

// CORS Middleware
app.use(cors({
    origin: APP_URL,               // Allow only the specific origin
    credentials: true,             // Allow credentials (cookies, authorization headers)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Use your router after the middleware
app.use("/users", usersRouter);

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});
