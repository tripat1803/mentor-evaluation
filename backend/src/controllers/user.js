const { Mentor } = require("../models/mentor.model");
const { Student } = require("../models/student.model");
const { User } = require("../models/user.model");


exports.createStudent = async (req, res) => {
    try {
        const { firstname, lastname, mobileNumber, city, state, address, pincode, rollNo } = req.body;
        let user = await (new User({
            firstname,
            lastname,
            mobileNumber,
            city,
            state,
            address,
            pincode
        })).save();
    
        await (new Student({
            profile: user._id,
            rollNo,
        }));

        res.status(200).json({
            message: "Student added"
        })
    } catch(err) {
        return res.status(500).json({
            message: "Server error occured"
        })
    }
}

exports.createMentor = async (req, res) => {
    try {
        const { firstname, lastname, mobileNumber, city, state, address, pincode, faculityRollNo, specialization } = req.body;
        let user = await (new User({
            firstname,
            lastname,
            mobileNumber,
            city,
            state,
            address,
            pincode
        })).save();
    
        await (new Mentor({
            profile: user._id,
            faculityRollNo,
            specialization
        }));

        res.status(200).json({
            message: "Mentor added"
        })
    } catch(err) {
        return res.status(500).json({
            message: "Server error occured"
        })
    }
}