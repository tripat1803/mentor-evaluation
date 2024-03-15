const mongoose = require("mongoose");
const { Evaluation } = require("../models/evaluation.model");
const { Student } = require("../models/student.model");
const Ideation = require("../utils/utils");
const sendVerificationMail = require("../utils/sendVerificationMail");

exports.createEvaluation = async (req, res) => {
    try {
        const { mentor_id, students = [] } = req.body;

        let check = await Evaluation.find({ mentor_id });

        if (!students || (check.length === 4) || (students.length + check.length < 3)) {
            return res.status(403).json({
                message: "Invalid input"
            })
        }

        await Promise.all(students.map((item) => {
            return (new Evaluation({
                mentor_id,
                student_id: item._id
            })).save();
        }));

        return res.status(200).json({
            message: "Status Ok"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error occured",
            err
        })
    }
}

exports.getEvaluation = async (req, res) => {
    try {
        let data = await Evaluation.aggregate([
            {
                $match: {
                    mentor_id: new mongoose.Types.ObjectId(req.query.id)
                }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "student_id",
                    foreignField: "_id",
                    as: "profile"
                }
            },
            {
                $unwind: "$profile"
            },
            {
                $project: {
                    rollNo: "$profile.rollNo",
                    studentId: "$profile._id",
                    status: "$status",
                    scores: "$scores"
                }
            }
        ]);

        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error occured"
        })
    }
}

exports.deleteEvaluation = async (req, res) => {
    try {
        await Evaluation.deleteOne({ _id: req.query.id });

        return res.status(200).json({
            message: "Status Ok"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error occured"
        })
    }
}

exports.updateEvaluation = async (req, res) => {
    try {
        let { ideation, execution, pitch, viva, evaluationId } = req.body;
        let previous = await Evaluation.findOne({ _id: evaluationId });

        if(previous.status === "completed"){
            return res.status(403).json({
                message: "Cannot update completed evaluations"
            })
        }
        
        let scores = new Ideation(ideation ? ideation : previous?.scores?.ideation, execution ? execution : previous?.scores?.execution, pitch ? pitch : previous?.scores?.pitch, viva ? viva : previous?.scores?.viva);
        
        await Evaluation.updateOne({
            _id: evaluationId
        }, {
            $set: {
                scores: scores.getAttributes()
            }
        });

        return res.status(200).json({
            message: "Status Ok"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error occured",
            err
        })
    }
}

exports.lockEvaluation = async (req, res) => {
    try {
        let { selectedIds = [] } = req.body;

        await Promise.all(selectedIds.map((id) => {
            return (async () => {
                let previous = await Evaluation.findOne({ _id: id });

                if(!previous?.scores?.get("ideation") || previous?.scores?.get("ideation") === 0 || !previous?.scores?.get("execution") || previous?.scores?.get("execution") === 0 || !previous?.scores?.get("pitch") || previous?.scores?.get("pitch") === 0 || !previous?.scores?.get("viva") || previous?.scores?.get("viva") === 0){
                    throw new Error("Cannot process incomplete evaluations");
                }
        
                await Evaluation.updateOne({
                    _id: id
                }, {
                    $set: {
                        status: "completed"
                    }
                });
            })();
        }));

        
        return res.status(200).json({
            message: "Status Ok"
        })
    } catch(err){
        return res.status(500).json({
            message: "Server error occured"
        })
    }
}

exports.sendMail = async (req, res) => {
    let evaluationId = req.query.id;
    const user = await Evaluation.findOne({
        _id: evaluationId
    })
    const student = await Student.findOne({
        _id: user.student_id
    })
    sendVerificationMail(student)

}