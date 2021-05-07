const cost = require("../middleware/costValidator.js");
const Course = require("../models/Course.js");


exports.pushContent = async(req,res,next)=>{
	
	console.log(req.body.id);
	console.log(req.body.videoid);
 	const test = await Course.findByIdAndUpdate({_id:req.body.id},{

			$push:{
				contents:req.body.videoid
			}},(err,success)=>{
				if(err){
					console.log(err);
				}else{
					console.log(success);
					res
					.status(200)
					.json({ success: true,
							data:success
					});
		
				}
			});

}


exports.getCourses = async(req,res,next) => {
    //res.sendStatus(400);	
	try {
		const courses = await Course.find();
		res
		.cookie("temp","temp")
		.clearCookie('temp')
		.status(200)
		.json({ success: true,
			    data:courses
		});
		
	} catch (error) {
		res
		.status(400).json({
			success:false
		})
		
	}
	
	
	//res.send("Hello From Express");
}

exports.getCourse = async(req,res,next) => {
    //res.sendStatus(400);
	
	try {

		const course = await Course.findById(req.params.id,(err,doc)=>{
			if(err){
				console.log(err);

			}
		});
		res
		//.cookie("temp","temp")
		//.clearCookie('temp')
		.status(200)
		.json({ success: true,
			    data:courses
		});
		
	
	} catch (error) {
		res
		.status(400).json({
			success:false
		})
		
	}
	
	
	//res.send("Hello From Express");
}

exports.createCourse = async (req,res,next) => {
    //res.sendStatus(400);
	//console.log(req.file);

	try{
		
		const courseDetails = {
			name:req.body.name,
			cost:req.body.cost,
			instructor:req.body.instructor,
			duration: req.body.duration,
			description: req.body.description
		};
		
			const course = await  Course.create(courseDetails);
			res.status(201).json({
				success:true,
				data: course 
			});
		

		

	}catch(err){
		res.status(400).json({
			success:false
		});

	}
	
	

	//res.send("Hello From Express");
}

exports.updateCourse = async(req,res,next) => {
    //res.sendStatus(400);

	try {


		const bootcamp = await Course.findByIdAndUpdate(req.params.id,req.body,{
			new:true,
			runValidators:true
		});
	
		if(!bootcamp){
			return res.status(400).json({success:false});
		}
	
	
		res
		.status(200)
		.json({success: true,
		data: bootcamp });
		
	} catch (error) {

		res.status(400).json({success:false});
		
	}
	
	//res.send("Hello From Express");
}

exports.deleteCourse = async (req,res,next) => {
    //res.sendStatus(400);
	
	try {

		const bootcamp = await Course.findByIdAndRemove(req.params.id);
	
		if(!bootcamp){
			return res.status(400).json({success:false});
		}
	
	
		res
		.status(200)
		.json({success: true,
		data: {} });
		
	} catch (error) {

		res.status(400).json({success:false});
		
	}
	
	//res.send("Hello From Express");
}
