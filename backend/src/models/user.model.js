const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileCode: {
        type: String,
        default: "+91"
    },
    mobileNumber: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    profileId: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "mentor"],
        default: "student"
    }
}, {
    timestamps: true
});

userSchema.virtual("name").get(() => (`${this.firstname} ${this.lastname}`));

exports.User = new mongoose.model("users", userSchema);