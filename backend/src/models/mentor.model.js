const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    faculityId: {
        type: String,
        unique: true,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

exports.Mentor = new mongoose.model("mentors", mentorSchema);