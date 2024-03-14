const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.use("/api/user", require("./src/routes/user.route.js"));
app.use("/api/score", require("./src/routes/evaluation.route.js"));

module.exports = app;