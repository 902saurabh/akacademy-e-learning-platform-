const Course = require('../models/Course');
const User = require('../models/User');

exports.addToCart = async(req,res,next)=>{
    console.log(req.body.id);
    User.find({ _id:req.body.id,
        $or:[
        {mycart:{"$in" : req.body.courseId}},
        {mycourses:{"$in" : req.body.courseId}}

        ]},
        (err,success)=>{

        if(success.length>0){
            console.log("Already Present");
            res.status(200).json({success:true,msg:"Course is already Present in Cart or already purchased!"});
        }else{

            User.findOneAndUpdate({_id:req.body.id},{
                $push: {mycart:req.body.courseId}
            },(err,success)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(success);
                }
            });

            res.status(200).json({success:true,msg:"Element added to cart successfully!"});

        }

    });

}


exports.removeFromCart = async(req,res,next) => {
    const update = await User.findOneAndUpdate({_id:req.body.id},{
        $pull:{mycart:req.body.courseId}
    },(err,success)=>{
        if(err){
            res.status(401).json({success:false,msg:"Something Went Wrong"});
        }else{
            res.status(200).json({success:false,msg:"operation successfull"});
        }

    });
}

exports.getCartCourses = async(req,res,next) => {
   const user = await User.findById(req.body.id);
   const ids = user.mycart;
   const courses = await Course.find().where("_id").in(ids).exec();
    //const user = await User.findById(req.body.id);
    res.status(200).json({
        success :    true,
        data : courses
    });
   
}

exports.getMyCourses = async(req,res,next) => {
    console.log(req.body.id);
    const user = await User.findById(req.body.id);
    const ids = user.mycourses;
    console.log(ids);
    const courses = await Course.find().where("_id").in(ids).exec();
     //const user = await User.findById(req.body.id);
     res.status(200).json({
         success :   true,
         data : courses
     });
    
 }
 
 



exports.addToMycourse = async(req,res,next) => {


    User.find({_id:req.body.id,mycourses:req.body.courseId},(err,success)=>{

        if(success.length>0){
            console.log("Already Present");
            res.status(200).json({success:true,msg:"Already Purchased!"});
        }else{
           // let flag = false;
            User.findOneAndUpdate({_id:req.body.id},{
                $push: {mycourses:req.body.courseId},
                $pull: {mycart:req.body.courseId}
            },(err,success)=>{
                if(err){
                    console.log(err);
                    res.status(401).json({success:false,msg:"Modal query error!"});


                }else{
                    console.log(success);
                }
            });

            res.status(200).json({success:true,msg:"Course Purchase Successfull"});

        }

    });

    
}
 