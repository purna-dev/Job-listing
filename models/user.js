const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    mobile:{
        required:true,
        type:Number,
    },
    password:{
        required:true,
        type:String
    }
},{
    timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}
})

const User = mongoose.model('Users',userSchema);

module.exports = User