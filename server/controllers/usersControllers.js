const { default: mongoose } = require("mongoose")
const users =require('../models/usersModels.js')
const jobDetails =require('../models/userJobModels.js')
const ApiError =require('../utils/apiError.js')
const ApiResponse = require('../utils/apiResponse.js')



const register = async (req, res) => {
    
    //checks for data validity
    // checks for duplicate user
    //if not create user
    // check for successful creation of user
    // return response to the frontend with users data along with status code and message

   
    const {userName,userId,email,password}=req.body

    if(!userName || !userId || !email || !password){
        return res.status(400).json(new ApiResponse(400,"All fields are required"))
    }

    const existedUser = await users.findOne({
        $or: [{ userId: userId }, { userEmail: email }]})

    if(existedUser){
        return res.status(401).json(new ApiResponse(401,"User already exist"))
       
    }

    

    const data={
        userName:userName,
        userId:userId,
        email:email,
        password:password
    }

    const newuser= await users.create(data);
    if(newuser){
        return res.status(201).json(new ApiResponse(201,"User registration successful"))
    }
   
    return res.status(501).json(new ApiResponse(500,"Something went wrong while registering the user"))
}

const postJob = async (req, res) => {
     //checks for data validity
    // checks for duplicate jobdetails
    //if not, create jobDetails
    // check for successful creation of jobdetails
    // return response to the frontend with jobDetails data along with status code and message
    const userId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!userId){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }

    const {jobName, jobId, price, category, subCategory, date, time, location, state,  district, description ,address} = req.body
    // console.log(req.body)
    const user=await users.findOne({_id:userId});
    // console.log(user)
    if(!user){
        return res.status(404).json(new ApiResponse(404," ","you have not registered yet."))
    }
    if ( jobName && jobId && price>=0 && category && subCategory && date && time && location &&  state && district && description && address) {
        const data = {
            jobName:jobName,
            jobId:jobId,
            price:price,
            category:category,
            subCategory:subCategory,
            date:date,
            time:time,
            location:location,
            district:district,
            state:state,
            description:description,
            address:address,
            user:user._id,
            status:"Active",
            jobCreator:userId
            
        }

        const newJobDetails= await jobDetails.create(data);
       
        const addJobTouser=user.jobPosted.push(newJobDetails._id);
        user.save();
        if(addJobTouser){
            return res.status(201).json(new ApiResponse(201,newJobDetails,"Job details successfully posted"))
        }

        return res.status(501).json(new ApiResponse(501,"Something went wrong while posting the job details"))

    }
   
    return res.status(400).json(new ApiResponse(400,req.body,"All Details are required"))


}

const getJob = async (req, res) => {
    // const userId=  await req.cookies["userId"]
    // console.log('uid',userId)
    // console.log('cookies',req.cookies)
    // if(!userId){
    //     console.log("user-id not found")
    //     return res.status(401).json(new ApiResponse(401," ","please login first"))
    // }
    //public job
    // const result=await jobDetails?.find({jobCreator:userId})
    const result=await jobDetails?.find()
    // console.log(jobDetails)
    if(result){
        return res.status(201).json(new ApiResponse(201,result,"success"))
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))


}

const getJobUserId = async (req, res) => {
    const userId=  await req.cookies["userId"]
    // console.log('uid',userId)
    // console.log('cookies',req.cookies)
    if(!(userId?.toString()?.length==24)){
        return  res.status(302).json(new ApiResponse(302," ","unauthorized Access"));
    }
    //public job
    // const result=await jobDetails?.find({jobCreator:userId})
    const result=await jobDetails?.find({jobCreator: userId })
    // console.log(jobDetails)
    if(result){
        return res.status(201).json(new ApiResponse(201,result,"success"))
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))


}
const getJobById = async (req, res) => {
    const jobId=req.query.jobId;
    const job=await jobDetails.findOne({_id:jobId}).populate("requestedUsers");
    console.log(job)
    if(job){
        return res.status(201).json(new ApiResponse(201,job,"success"))
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))


}

const acceptJob = async (req, res) => {
    //get jobid and user-id
    // validate both id
    //push job into accepted ref in user's model
    //change job status
    //add to provider list
    
    const jobProviderUserId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!jobProviderUserId){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }
    const jobId=req.query.jobId;
    // const userId=req.query.userId;
    const userId=req.query.userId;
    // const jobProviderUserId=req.query.providerUserId;
    if(!jobId && !userId && !(jobProviderUserId?.toString()?.length==24)){
        
        return res.status(401).json(new ApiResponse(401," ","All fields are required"))
    }
    // console.log(jobId,userId)
    const user=await users.findOne({_id:userId});
    const jobProvider=await users.findOne({_id:jobProviderUserId});
    //pushing
    const updatedAcceptedJob=await user?.jobAccepted.push(jobId)
    const updatedJobStatusForUser=await users?.findOneAndUpdate(
       {_id: userId,'jobStatusForUser.job': jobId},
        { $set: { 'jobStatusForUser.$.currentStatus': 'Accepted' } } ,
        { new: false }
      );
    //Note: user will be only appointed when user will join the job after acceptance
    // const updatedAppointedJob=jobProvider?.jobAppointed.push({user:userId,job:jobId})
    const updatedJobStatusForProvider=await users?.findOneAndUpdate(
        { _id: jobProviderUserId, 'jobStatusForProvider.job': jobId },
        { $set: { 'jobStatusForProvider.$.currentStatus': 'Accepted' } },
        { new: false }
      );
    //   users.save()
    console.log(updatedJobStatusForProvider)
    user?.save();
    jobProvider?.save();
    if(updatedAcceptedJob  && updatedJobStatusForUser && updatedJobStatusForProvider){
        // console.log("s")
        return res.status(201).json(new ApiResponse(201," ","Success"));
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))

}
const rejectJob = async (req, res) => {
     //get jobid and user-id
    // validate both id
    //push job into accepted ref in user's model
    //change job status
    //add to provider list
    const jobProviderUserId=  req.cookies["userId"]
    // console.log(req.cookies)
    const userId=req.query.userId;
    if(!userId){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }
    const jobId=req.query.jobId;
    // const userId=req.query.userId;
   
    // const jobProviderUserId=req.query.providerUserId;
    if(!jobId && !userId && !(jobProviderUserId?.toString()?.length==24)){
        
        return res.status(401).json(new ApiResponse(401," ","All fields are required"))
    }
    console.log(jobId,userId)
    const user=await users.findOne({_id:userId});
    const jobProvider=await users.findOne({_id:jobProviderUserId});
    //pushing
    const updatedAcceptedJob=user?.jobRejected.push(jobId)
    const updatedJobStatusForUser=user?.jobStatusForUser.push({job:jobId,currentStatus:"Rejected"})
    // const updatedAppointedJob=jobProvider?.jobAppointed.push({user:userId,job:jobId})
    const updatedJobStatusForProvider=jobProvider?.jobStatusForProvider.push({job:jobId,currentStatus:"Rejected"})
    user?.save();
    jobProvider?.save();
    if(updatedAcceptedJob  && updatedJobStatusForUser && updatedJobStatusForProvider){
        console.log("s")
        return res.status(201).json(new ApiResponse(201," ","Success"));
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))


}


const joinJob = async (req, res) => {
     //get jobid and user-id
    // validate both id
    //push job into accepted ref in user's model
    //change job status
    //add to provider list
    const userId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!(userId?.toString()?.length==24)){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }
    const jobId=req.query.jobId;
    // const userId=req.query.userId;
    const jobProviderUserId=req.query.jobProviderId;
    // const jobProviderUserId=req.query.providerUserId;
    if(!jobId && !userId && !jobProviderUserId){
        
        return res.status(401).json(new ApiResponse(401," ","All fields are required"))
    }
    // console.log(req.query)
    const user=await users.findOne({_id:userId});
    const jobProvider=await users.findOne({_id:jobProviderUserId});
    //pushing
    // console.log(userId,)
    // console.log(jobProviderUserId)
    if(!user || !jobProvider){
        return res.status(401).json(new ApiResponse(401," ","details not found error"));
    }
    const jobExists =await user.jobConfirmed.includes(jobId);
    console.log(jobExists)
    if(!jobExists){

        var updatedAcceptedJob= await user?.jobConfirmed.push(jobId)
    }



    const updatedJobStatusForUser=await users?.findOneAndUpdate(
        {_id: userId,'jobStatusForUser.job': jobId},
         { $set: { 'jobStatusForUser.$.currentStatus': 'Confirmed' } } ,
         { new: false }
       );
    //    console.log(jobProvider)
    const appointedJobExist = jobProvider.jobAppointed.some(
        (item) => item.job.toString() === jobId && item.user.toString() === userId
      );
       console.log(appointedJobExist)
       if(!appointedJobExist){

           var updatedAppointedJob=await jobProvider?.jobAppointed.push({user:userId,job:jobId})
       }
    const updatedJobStatusForProvider=await users?.findOneAndUpdate(
        { _id: jobProviderUserId, 'jobStatusForProvider.job': jobId },
        { $set: { 'jobStatusForProvider.$.currentStatus': 'Confirmed' } },
        { new: false }
      );
    user?.save();
    jobProvider?.save();
    if(updatedAcceptedJob && updatedAppointedJob && updatedJobStatusForUser && updatedJobStatusForProvider){
        console.log("s")
        return res.status(201).json(new ApiResponse(201," ","Success"));
    }
    return res.status(501).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))

}

const cancelJob = async (req, res) => {
    //get jobid and user-id
    // validate both id
    //push job into accepted ref in user's model
    //change job status
    //add to provider list
    const userId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!(userId?.toString()?.length==24)){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }
    const jobId=req.query.jobId;
    // const userId=req.query.userId;
    const jobProviderUserId=req.query.jobProviderId;
    // const jobProviderUserId=req.query.providerUserId;
    if(!jobId && !userId && !jobProviderUserId){
        
        return res.status(401).json(new ApiResponse(401," ","All fields are required"))
    }
    console.log(jobId,userId)
    const user=await users.findOne({_id:userId});
    const jobProvider=await users.findOne({_id:jobProviderUserId});
    //pushing
    const updatedAcceptedJob=user?.jobCanceled.push(jobId)
    const updatedJobStatusForUser=user?.jobStatusForUser.push({job:jobId,currentStatus:"Canceled"})
    // const updatedAppointedJob=jobProvider?.jobAppointed.push({user:userId,job:jobId})
    const updatedJobStatusForProvider=jobProvider?.jobStatusForProvider.push({job:jobId,currentStatus:"Canceled"})
    user?.save();
    jobProvider?.save();
    if(updatedAcceptedJob && updatedJobStatusForUser && updatedJobStatusForProvider){
        console.log("s")
        return res.status(201).json(new ApiResponse(201," ","Success"));
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))

}
const completeJob = async (req, res) => {
    //get jobid and user-id
    // validate both id
    //push job into accepted ref in user's model
    //change job status
    //add to provider list
    const userId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!(userId?.toString()?.length==24)){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }
    const jobId=req.query.jobId;
    // const userId=req.query.userId;
    const jobProviderUserId=req.query.jobProviderId;
    // const jobProviderUserId=req.query.providerUserId;
    if(!jobId && !userId && !jobProviderUserId){
        
        return res.status(401).json(new ApiResponse(401," ","All fields are required"))
    }
    console.log(jobId,userId)
    const user=await users.findOne({_id:userId});
    const jobProvider=await users.findOne({_id:jobProviderUserId});
    //pushing
    const updatedAcceptedJob=user?.jobCompleted.push(jobId)
    const updatedJobStatusForUser=user?.jobStatusForUser.push({job:jobId,currentStatus:"Completed"})
    const updatedAppointedJob=jobProvider?.jobPostedDone.push({user:userId,job:jobId})
    const updatedJobStatusForProvider=jobProvider?.jobStatusForProvider.push({job:jobId,currentStatus:"Completed"})
    user?.save();
    jobProvider?.save();
    if(updatedAcceptedJob && updatedAppointedJob && updatedJobStatusForUser && updatedJobStatusForProvider){
        console.log("s")
        return res.status(201).json(new ApiResponse(201," ","Success"));
    }
    return res.status(500).json(new ApiResponse(501,"","Something went wrong while finding jobs details"))

}

const userApplyForJob = async (req, res) => {
    // find jobid
    //find user-id
    //push job-id into user.requestedJob
    //push user-id into jobdetails.requestedUsers
    //change status of job in the user for the field jobStatus
    // const ck=req.cookies["userId"]
    // console.log(req.cookies)
    // return res.json({'ck':ck})
    const userId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!(userId?.toString()?.length==24)){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }
    const user=await users.findOne({_id:userId})
    
   
    //if unable to get user
    if(!user){
        return res.status(401).json(new ApiResponse(401," ","Plaese try after some time"))
    }
    //get job-id from user on which they clicked
    
    const jobId=req.query.jobId
    const job=await jobDetails.findOne({_id:jobId});
    console.log(job)
    if(!jobId){
        return res.status(400).json(new ApiResponse(400,"","job-id not found"))
    }
    const addJobIdToUser=await user.jobRequested.push(jobId);
    if(!addJobIdToUser){
        return res.status(500).json(new ApiResponse(500,"","Something went wrong when adding jobId to user"))
    }
    const addJobIdToJobStatus=await user.jobStatusForUser.push({job:jobId,currentStatus:"Requested"});
    if(!addJobIdToJobStatus){
        return res.status(500).json(new ApiResponse(500,"","Something went wrong when adding jobId to user"))
    }
    const addJobIdToJobStatusForProvider=await user.jobStatusForProvider.push({job:jobId,currentStatus:"Requested"});
    if(!addJobIdToJobStatusForProvider){
        return res.status(500).json(new ApiResponse(500,"","Something went wrong when adding jobId to user"))
    }
    user.save();
    const addUserToJobId=await job.requestedUsers.push(userId);

    if(!addUserToJobId){
        return res.status(500).json(new ApiResponse(500,"","Something went wrong when adding  user to job-details"))
    }
    

    job.save();


    console.log("succ")

    return res.status(201).json(new ApiResponse(201,"result","success"))

}
const userPostedJobs = async (req, res) => {
    // find user-id
    //validate user-id
    //find all job-id and return
    //Note: it is a job/works provider
    const jobProviderUserId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!(userId?.toString()?.length==24)){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }

    const jobProvider=await users.findOne({_id:jobProviderUserId});
    // const userId=user._id;
    // console.log(jobProvider)
    // if(!userId){
    //     // console.log("userId")
    //     await res.redirect(301,'login')
    // }
    
    const ProviderJobs=jobProvider.jobPosted;

    if(!ProviderJobs){
        return res.status(500).json(new ApiResponse(500,"","Something went wrong while fetch job details"))
    }
   

    return res.status(201).json(new ApiResponse(201,ProviderJobs,"success"))

}
const userDeletePostedJob = async (req, res) => {
    // find user-id
    //find job-id
    //validate both user-id and job-id
    //find all job-id and remove that particular job-id
    //push back to job array to the users
    const jobProviderUserId=  req.cookies["userId"]
    // console.log(req.cookies)
    if(!(userId?.toString()?.length==24)){
        // console.log("uid")
        return res.status(401).json(new ApiResponse(401," ","please login first"))
    }

    //const jobProvider=await users.findOne({_id:jobProviderUserId});
    // const userId=user._id;
    // console.log(jobProvider)
    // if(!userId){
    //     // console.log("userId")
    //     await res.redirect(301,'login')
    // }
    
    const jobId= req.query.jobId;
    const job=await jobDetails.findOneAndUpdate({_id:jobId},{$set:{status:"InActive"}});
    

    if(!jobId){
        return res.status(401).json(new ApiResponse(401," ","something went wrong while fetching jobId"))
    }

    // const newAllJobs=await users.findByIdAndUpdate(
    //     {_id:jobProvider},
    //     { $pull: { jobPosted: mongoose.Types.ObjectId(jobId) } },
    //     { new: true }
    //   );

    // jobProvider.save();
    job.save();


    if(!newAllJobs){
        return res.status(500).json(new ApiResponse(500,"","Something went wrong while fetch job details"))
    }
   

    return res.status(201).json(new ApiResponse(201,currentJob,"success"))

}



module.exports = {getJobUserId, cancelJob,joinJob,acceptJob,rejectJob,getJobById,userDeletePostedJob, register, postJob, getJob,userApplyForJob ,userPostedJobs}