const nodemailer = require("nodemailer");
module.exports= async (userEmail,subject,htmlTemplate)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: process.env.APP_EMAIL_ADRESS, // sender
              pass: process.env.APP_EMAIL_APP_PASSWORD,
            },

          });
          const mailOptions={
            from: process.env.APP_EMAIL_ADRESS,
            to:userEmail,
            subject:subject,
            html:htmlTemplate
          }
          const info=await transporter.sendMail(mailOptions)
          console.log("email sent", info.response)
    } catch (error) {
        console.log(error)
        throw new Error("Internal server error (nodemailer) ")
    }
}