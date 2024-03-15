const express = require("express");
const { createEvaluation, getEvaluation, deleteEvaluation, updateEvaluation, lockEvaluation, sendMail } = require("../controllers/evaluation");
const router = express.Router();

router
    .route("/")
    .post(createEvaluation)
    .get(getEvaluation)
    .delete(deleteEvaluation)
    .put(updateEvaluation)
router
    .route("/lock")
    .post(lockEvaluation);
router
    .route("/sendMail")
    .post(sendMail);

module.exports = router;