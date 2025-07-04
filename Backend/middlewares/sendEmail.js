const nodeMailer = require('nodemailer');
exports.sendEmail = async(options) =>{
    const transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d698db14ded5cd",
    pass: "50814156c83fde"
  }
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions);
}