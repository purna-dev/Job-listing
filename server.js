require('dotenv').config()
require('./config/dbConfig')
const express = require('express')
const app = express()
const auth = require('./routes/auth')
const jobs = require('./routes/jobs')
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const errorHandle = require('./middleware/errorHandler')
const cookie = require('cookie-parser')
app.use(express.json())
app.use(cookie())


app.get('/api',(req,res)=>{
    res.status(200).json({status:'active',date: new Date(),service:'job listing api'})
})
app.use('/user',auth)
app.use('/job',jobs)
app.use('/*',(req,res)=>{
    console.log('Route not found')
    const userReq = req.params[0]
    // console.log(userReq)
    res.status(404).json({message:`${userReq} Route not found`})
})
app.use(errorHandle)
app.listen(port,()=>{
    console.log(`Server is active at http://${host}:${port}`)
})

