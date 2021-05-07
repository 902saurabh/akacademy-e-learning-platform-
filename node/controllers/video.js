const Video = require('../models/Video');

exports.getVideo = async(req,res,next)=>{

    try{
        const video = await Video.findById(req.body.id,(err,doc)=>{
            if(err){
                console.log(err);
    
            }
        });
        res
        //.cookie("temp","temp")
        //.clearCookie('temp')
        .status(200)
        .json({ success: true,
                data: video
        });

    }catch(error){
        //console.log(error);
        res
		.status(400).json({
			success:false
		})
    }
}

exports.uploadVideo = async(req,res,next)=>{
    try{

        /*
        let data = {
            title:"first video",
            videourl:"https://player.vimeo.com/video/76979871",
            duration:"2 min"
        }
        */
        let data = {
            title:req.body.title,
            videourl:req.body.videourl,
            duration:req.body.duration
        }


        const upload = await  Video.create(data);
			res.status(201).json({
				success:true 
			});
		


    }catch(err){
        res
		.status(400).json({
			success:false
		})

    }
}
