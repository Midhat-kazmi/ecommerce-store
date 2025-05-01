const nodemailer = require('nodemailer');

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE, // like 'gmail'
        secure: true, // for port 465 (SSL)
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM, // e.g., "Your Name <your@email.com>"
        to: options.email,           // changed from 'to' to 'email' to match your controller
        subject: options.subject,
        text: options.message,       // using 'message' instead of 'text'
        html: options.html || '',    // optional
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
