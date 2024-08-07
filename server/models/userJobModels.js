const mongoose=require('mongoose')

const usersJobSchema=mongoose.Schema({
    jobName:String,
    jobId:String,
    price:Number,
    category:String,
    subCategory:String,
    date:String,
    time:String,
    location:String,
    skills:[{type:String}],
    state:String,
    district:String,
    description:String,
    address:String,
    jobCreator:{type:mongoose.Schema.Types.ObjectId,
        ref:"users" 
    },
    requestedUsers:[{type:mongoose.Schema.Types.ObjectId,
        ref:"users" 
    }],
    status:{
        type:String,
        enum:["Active","InActive"],
        require:true
    }
})


const jobDetails=mongoose.model("jobDetails",usersJobSchema)

module.exports=jobDetails