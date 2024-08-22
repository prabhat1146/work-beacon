const users = require("../models/usersModels");
const jobDetails = require("../models/userJobModels");
const ApiResponse = require("../utils/apiResponse");


const signUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json(new ApiResponse(401, " ", "All fileds are required"));
    }
    // console.log(email)
    const existedUser = await users.findOne({ userEmail: email })
    if (existedUser) {
        return res.status(401).json(new ApiResponse(401, "User already exist"))

    }
    const user = await users.create({ userEmail: email, password: password });
    if (user) {

        return res.status(201).json(new ApiResponse(201, user, "You have sign-up successfully."));
    }

    return res.status(501).json(new ApiResponse(501, " ", "Unable to sign-up now./n try after sometime "));
}
const login = async (req, res) => {
    console.log("i am from login")
    const { email, password } = req.body;

    if (!email && !password) {
        return res.status(401).json(new ApiResponse(401, " ", "All fileds are required"));
    }

    const user = await users.findOne({ userEmail: email });
    console.log(req.body)
    if (user) {
        if (password == user.password) {
            res.cookie("userId", user?._id, { httpOnly: false, sameSite: 'None', secure:true , path: '/' })
            console.log('css')
            return res.status(201).json(new ApiResponse(201, user, "login success."));
        }
        return res.status(402).json(new ApiResponse(402, user, "Your password is incorrect"));
    } else {

        return res.status(501).json(new ApiResponse(501, " ", "You have not sign-up yet."));
    }

}
const logout = async (req, res) => {
    const userId = req.cookies["userId"];
    
    if (userId && userId.toString().length === 24) {
        res.clearCookie("userId");
        return res.status(200).json(new ApiResponse(200, "", "You have logged out."));
    }

    return res.status(400).json(new ApiResponse(400, "", "Invalid user ID."));
}


const getUser = async (req, res) => {
    const userId = req.cookies["userId"];
    if(!userId){
        return res.status(401).json(new ApiResponse(401," ","please login"))
    }
    const user = await users.findOne({ _id: userId });
    if (user) {
        return res.status(201).json(new ApiResponse(201, user, "success"))
    }
    return res.status(401).json(new ApiResponse(401, " ", "Failed"))

}

const getPopulatedUserByReq = async (req, res) => {
    const userId = req.cookies["userId"];
    if(!userId){
        return res.status(401).json(new ApiResponse(401," ","please login"))
    }
    const user = await users.findOne({_id:userId}).populate("jobRequested");
    if (user) {
        console.log(user)
        return res.status(201).json(new ApiResponse(201, user, "success"))
    }
    return res.status(401).json(new ApiResponse(401, " ", "Failed"))

}

const getPopulatedUserByCon = async (req, res) => {
    const userId = req.cookies["userId"];
    if(!userId){
        return res.status(401).json(new ApiResponse(401," ","please login"))
    }
    const user = await users.findOne({_id:userId})?.populate("jobConfirmed");
    if (user) {
        console.log(user)
        return res.status(201).json(new ApiResponse(201, user, "success"))
    }
    return res.status(401).json(new ApiResponse(401, " ", "Failed"))

}

const getUsers = async (req, res) => {
   
    const user = await users.findOne();
    if (user) {
        return res.status(201).json(new ApiResponse(201, user, "success"))
    }
    return res.status(401).json(new ApiResponse(401, " ", "Failed"))

}
const getCookie = async (req, res) => {
    const ck = req.cookies["userId"]
    console.log(req.cookies)
    return res.json({ 'ck': ck })
}



module.exports = {
    login,logout, signUp, getCookie,getUser,getUsers,getPopulatedUserByReq,getPopulatedUserByCon
}