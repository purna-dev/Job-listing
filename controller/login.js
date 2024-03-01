const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async(req,res)=>{

    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                ErrorMessage:'Bad request'
            })
        }
        const userDetails = await user.findOne({email})
        // console.log(userDetails)
        if(!userDetails){
            return res.status(401).json({
            ErrorMessage:'Invalid credentials'
            })
        }

        const passwordMatch = await bcrypt.compare(password,userDetails.password)

        if(!passwordMatch) {
            return res.status(401).json({
                ErrorMessage:'Invalid credentials',
            })
        }

        const token = jwt.sign({id:userDetails._id},process.env.JWT_KEY)
        res.cookie("token", token, { httpOnly: true });
        

        res.json({
            Message:'Logged in',
            user:userDetails.name,
            token:token
        })


    
    }catch(err){
        console.log(err)
    }

}

module.exports = login