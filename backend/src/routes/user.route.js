const express = require("express");
const { createStudent, createMentor } = require("../controllers/user");
const router = express.Router();

router.route("/student").post(createStudent);
router.route("/mentor").post(createMentor);

module.exports = router;