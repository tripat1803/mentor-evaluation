const mongoose = require("mongoose");

const evaluationSchema = mongoose.Schema({
    mentor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mentors",
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true,
        unique: true
    },
    scores: {
        type: Map,
        of: Number
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, {
    timestamps: true
});

exports.Evaluation = new mongoose.model("evaluations", evaluationSchema);