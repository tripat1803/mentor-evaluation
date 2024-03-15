const nodemailer = require('nodemailer');

function createMailTransporter() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "thetanutaneja@gmail.com",
            pass: "ysezlwkilnfvbfaq"
        },
    });

    return transporter;
}
module.exports = createMailTransporter;