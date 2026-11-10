const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully");
    }catch(err){
        console.error("Database connection error:", err);
        process.exit(1);
    }

}

module.exports = connectDB;
