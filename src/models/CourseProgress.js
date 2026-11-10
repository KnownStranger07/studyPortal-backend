const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    
    courseId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideos:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubSection"
    }]

})

const courseProgressModel = mongoose.model("CourseProgress", progressSchema);
module.exports = courseProgressModel;