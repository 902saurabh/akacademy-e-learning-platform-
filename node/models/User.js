const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { JsonWebTokenError } = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Please add a name']
    },
    email:{
        type: String,
        required : [true,'Please add an email'],
        unique : true,
        match:[
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            'Please add a valid email']
        
    },

    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },

    password: {
        type:String,
        required:[true,'Please add a password'],
        minlenghth: 6,
        select: false
    },
    
    mycourses:{
        type:[]
    },

    mycart:{
        type:[]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    CreatedAt:{
        type:Date,
        default: Date.now
    }
});

//encypt password
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

// sign jwt and return

userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id},
        process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRE
        });
};

//match password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model('User',userSchema);