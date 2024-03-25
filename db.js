const mongoose = require("mongoose")

const dbConnect = async (MONGO_URI)=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to mongodb")
    }catch(err){
        console.log(err)
    }
}

module.exports = dbConnect