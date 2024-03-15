const express = require("express");
const { createStudent, createMentor, getStudent } = require("../controllers/user");
const router = express.Router();

router
    .route("/student")
        .post(createStudent)
        .get(getStudent);
router.route("/mentor").post(createMentor);

module.exports = router;