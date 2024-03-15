const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database");
    } catch(err){
        console.log("Error while conecting to database");
    }
}