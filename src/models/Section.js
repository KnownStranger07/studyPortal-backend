const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const SectionSchema = new mongoose.Schema({

    sectionName : {
        type: String,

    },
    SubSections:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required : true,
    }]
});

module.exports = mongoose.model("Section", SectionSchema);