const nodemailer=require("nodemailer");
exports.sendEmail=async(receriverEmail,token)=>{
    try {
        const transPorter=nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EmailSender,
                pass: process.env.EmailSenderPassword,
            },
        })


        const mailOptions = {
            from: process.env.EmailSender,
            to: receriverEmail,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
        };

        await transPorter.sendMail(mailOptions)
        return true
    } catch (error) {
        throw error
    }
}