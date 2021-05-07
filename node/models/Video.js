const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({

    title:{type:String},
    videourl: {type:String},
    duration:{type:String},
    userids:{type:[]}
    /* thumbnail*/
});

module.exports = mongoose.model('Video',videoSchema);