const jobs = require('../models/jobs')
const createjob = async(req,res,next)=>{
    try
    {
        const {  companyName,
                logoUrl,
                jobPosition,
                monthlySalary,
                jobType,
                remoteOffice,
                location,
                jobDescription,
                aboutCompany,
                skills,
                information } = req.body

        if( !companyName ||
            !logoUrl ||
            !jobPosition ||
            !monthlySalary ||
            !jobType ||
            !remoteOffice ||
            !location ||
            !jobDescription ||
            !aboutCompany ||
            !skills ||
            !information )
            {
                return res.status(400).json({message:'Bad request',Input:'Check input fields'})
            }
        const jobDetails = new jobs({
            companyName,
            logoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            remoteOffice,
            location,
            jobDescription,
            aboutCompany,
            skills,
            information
        })

        console.log(req.userId)
        

        await jobDetails.save();
        res.status(200).json({
            message:'Job created succesfully'
        })

    }catch(error){
      next(error)
    }
}

const jobDiscription = async(req,res,next)=>{

try{
    const jobid = req.params.jobid

    if(!jobid){
        return res.status(400).json({
            errorMessage:'Bad request'
        })
    }

    const jobdetails = await jobs.findById(jobid)
    // console.log(jobdetails)
    res.json({ data:jobdetails})
    
}catch(err){
    next(err)
}
//    const jobDetails=await  

}

const editjob = async(req,res,next)=>{

    try{

        const jobid = req.params.jobid

    if(!jobid){
        return res.status(400).json({
            errorMessage:'Bad request'
        })
    }

    const {  companyName,
        logoUrl,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOffice,
        location,
        jobDescription,
        aboutCompany,
        skills,
        information } = req.body

if( !companyName ||
    !logoUrl ||
    !jobPosition ||
    !monthlySalary ||
    !jobType ||
    !remoteOffice ||
    !location ||
    !jobDescription ||
    !aboutCompany ||
    !skills ||
    !information )
    {
        return res.status(400).json({message:'Bad request',Input:'Check input fields'})
    }

    // const jobdetails = await jobs.findById(jobid)
    
    // if(!jobdetails){
    //     return res.status(400).json({message:'Invalid job id'})
    // }

    await jobs.findByIdAndUpdate({_id:jobid},{
        companyName,
        logoUrl,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOffice,
        location,
        jobDescription,
        aboutCompany,
        skills,
        information
    })
    res.json({ message:'updated successfully'})


    }catch(error){
        next(error)
    }

}

const getAllJobs = async(req,res,next)=>{

    try{
        const {skills,jobPosition} = req.query
    
        let skillsArr
        if(skills){
            skillsArr = skills.split(',')
        }
        // if(!jobid){
        //     return res.status(400).json({
        //         errorMessage:'Bad request'
        //     })
        // }
    
        const jobdetails = await jobs.find({
            jobPosition:{ $regex:jobPosition, $options:"i" },
            skills:{ $in:skillsArr },
            
        },
        {skills:1,jobPosition:1,companyName:1,logoUrl:1,monthlySalary:1,location:1})
        // console.log(jobdetails)
        res.json({ data:jobdetails})
        
    }catch(err){
        next(err)
    }
    //    const jobDetails=await  
    
    }



module.exports = {createjob, jobDiscription, editjob,getAllJobs}