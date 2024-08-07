const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    userName: String,
    userId: String,
    userEmail: String,
    userMobile: String,
    password: String,
    address: String,
    rating: {
        type:Number,
        default:0
    },
    skills: [{ type: String }],
    userSay: String,
    userReview:String,
    // user request
    jobRequested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    // provider will accept
    jobAccepted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
//user will confirm by changing its status accepted to confirm
//confirmed/joined
    jobConfirmed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    // user cancelled after accepted
    jobCanceled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    // user completed their job/works
    jobCompleted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    // provider rejected user's request
    jobRejected: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    //provider posted the new job/works
    jobPosted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    // providers works/job has been done by users/job seeker
    jobPostedDone: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobDetails"
    }],
    jobAppointed: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "jobDetails"
        }
    }],

    jobStatusForUser: [{
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobDetails"
        },
        currentStatus: {
            type: String,
            enum: ["Requested", "Accepted", "Confirmed","Canceled", "Completed", "Rejected"],
            // default: "Requested"
        }
    }],
    jobStatusForProvider: [{
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobDetails"
        },
        currentStatus: {
            type: String,
            enum: ["Requested","Accepted", "Confirmed","Canceled", "Completed", "Rejected"],
            // default: "Requested"
        }
    }]

})

const users = mongoose.model("users", usersSchema)



module.exports = users