const errorHandle = (error,req,res,next)=>{
    console.log(error)
        res.status(500).json({error:'Internal server error',Message:`${error}`})

}
module.exports = errorHandle