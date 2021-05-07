const User = require('../models/User');

exports.register = async(req,res,next)=>{
    const {name,email,password,role} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    //create token
    const token = user.getSignedJwtToken();
    res.status(200).json({success:true,token:token});
    
}

exports.login = async(req,res,next)=>{
    const {email,password} = req.body;
    
    //validate email & password

    if(!email || !password){
        
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({success:false,msg:'Invalid Credential'});
    }

    //check password
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(401).json({success:false,msg:"password don't match"});
    }

    //create token
    const token = user.getSignedJwtToken();
    res.status(200).json({success:true,token:token,data:user});
    
}