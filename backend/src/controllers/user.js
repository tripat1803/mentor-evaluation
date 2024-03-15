const { Mentor } = require("../models/mentor.model");
const { Student } = require("../models/student.model");
const { User } = require("../models/user.model");

exports.createStudent = async (req, res) => {
    try {
        const { firstname, lastname, mobileNumber, city, state, address, pincode, rollNo, email } = req.body;
        let user = await (new User({
            firstname,
            lastname,
            mobileNumber,
            city,
            state,
            address,
            pincode,
            email,
            role: "student",
        })).save();

        let data = await (new Student({
            profile: user._id,
            rollNo,
        })).save();

        await User.updateOne({ _id: user._id }, { profileId: data._id });

        res.status(200).json({
            message: "Student added"
        })
    } catch (err) {
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
            pincode,
            role: "mentor",
        })).save();

        let data = await (new Mentor({
            profile: user._id,
            faculityRollNo,
            specialization
        })).save();

        await User.updateOne({ _id: user._id }, { profileId: data._id });

        res.status(200).json({
            message: "Mentor added"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error occured"
        })
    }
}

exports.getStudent = async (req, res) => {
    try {
        let data = await Student.aggregate([
            {
                $lookup: {
                    from: "evaluations",
                    localField: "_id",
                    foreignField: "student_id",
                    as: "evaluation"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "profile",
                    foreignField: "_id",
                    as: "profile"
                }
            },
            {
                $unwind: "$profile"
            },
            {
                $project: {
                    name: {
                        $concat: ["$profile.firstname", " ", "$profile.lastname"]
                    },
                    email: "$profile.email",
                    mobileNumber: "$profile.mobileNumber",
                    rollNo: "$rollNo",
                    profileId: "$profile._id",
                    underEvaluation: "$evaluation"
                }
            }
        ]);

        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error occured",
            err
        })
    }
}