const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log({status:'ok',dbConnection:'success'})
}).catch((err)=>console.log({Error:err}))
