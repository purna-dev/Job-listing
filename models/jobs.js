const { default: mongoose } = require("mongoose");

const jobSchema = mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    },
    jobPosition:{
        type:String,
        required:true
    },
    monthlySalary:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    remoteOffice:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
        required:true
    },
    skills:{
        type:Array,
        required:true
    },
    information:{
        type:String,
        required:true
    }
},{
    timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}
})

module.exports = mongoose.model('Jobs',jobSchema)