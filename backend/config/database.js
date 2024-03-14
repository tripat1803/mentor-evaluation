const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "testing"
        })
        console.log("Connected to database");
    } catch(err){
        console.log("Error while conecting to database");
    }
}