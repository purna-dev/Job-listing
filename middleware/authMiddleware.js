const jwt = require('jsonwebtoken')
const users = require('../models/user')

const verifyToken = (req,res,next)=>{
    try
    {
        // const token = req.header('Authorization').split(' ');
        // if(!token || token.lenght < 2){
        //     return res.status(401).json({
        //         message:'Invalid token'
        //     })
        // }
        // const decode = jwt.verify(token[1],process.env.JWT_KEY)
        // console.log(decode.id)

        //cookie method
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decode.id;
        
        const verifyuser = users.findById(decode.id)

        if(!verifyuser){
            return res.status(401).json({
                message:'Unauthorized token'
            })

        }
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({
            message:'Invalid Token'
        })
    }
}

module.exports = verifyToken