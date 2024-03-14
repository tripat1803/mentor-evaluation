const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    faculityRollNo: {
        type: String
    },
    specialization: {
        type: String
    }
}, {
    timestamps: true
});

exports.Mentor = new mongoose.model("mentors", mentorSchema);