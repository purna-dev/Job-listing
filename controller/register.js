const bcrypt = require('bcrypt')
const user = require('../models/user')

const registerUser = async(req,res,next)=>{
    try{
        const {name,email,mobile,password}= req.body
        
    if(!name || !email || !mobile || !password){
        return res.status(400).json({
            ErrorMessage:'Bad request'
        })
    }

    
    const existEmail = await user.findOne({ email:email });

    if(existEmail){
        return res.status(409).json({
            ErrorMessage:'Email Id exists'
        })
    }

    const hashPassword = await bcrypt.hash(password,10)
    const newUser = {
        name,
        email,
        mobile,
        password:hashPassword
    }

    const User = new user(newUser)

    User.save().then((result) => {
        res.status(200).json({
            Message:'success',
            created:'successfully'
        })
    }).catch((err) => {
        res.status(500).json({
            Message:'Error',
            created:'Data not created'
        })
    });


    
    

    

    
    
    }catch(err){
        next(err)
    }

}


module.exports = registerUser