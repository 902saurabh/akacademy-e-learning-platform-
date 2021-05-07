 const mongoose = require('mongoose');

 const CourseSchema = new mongoose.Schema({
    name: {
         type: String,
         required: [true,'Please add a name'],
         unique:true,
         trim: true
    },
 
    cost: {
        type: Number,
        required: true
    },
    description:{
        type: String
    },
    instructor:{
        type: String
    },
    duration:{
        
        type:String
    },

    contents:{
        type:[]
    }
   
 });
 
module.exports = mongoose.model('Course',CourseSchema);


