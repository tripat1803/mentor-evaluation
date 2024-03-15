const createMailTransporter = require('../../config/createMailTransporter.js');

function sendVerificationMail(user) {
    const transporter = createMailTransporter();
    const mailOptions = {
        from: 'thetanutaneja@gmail.com',
        to: user.email,
        subject: 'Evaluation Submission Confirmation',
        html: `<h1>Hello ${user.username}</h1><br>
        <h3>Your evaluation has been submitted successfully.</h3>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    });
}
module.exports = sendVerificationMail;