const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

exports.Student = new mongoose.model("students", studentSchema);