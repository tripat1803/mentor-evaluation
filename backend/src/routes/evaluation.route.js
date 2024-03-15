const express = require("express");
const { createEvaluation, getEvaluation, deleteEvaluation, updateEvaluation } = require("../controllers/evaluation");
const router = express.Router();

router
    .route("/")
        .post(createEvaluation)
        .get(getEvaluation)
        .delete(deleteEvaluation)
        .put(updateEvaluation);

module.exports = router;