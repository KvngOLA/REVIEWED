const dotenv = require('dotenv')
dotenv.config();

const nodemailer = require('nodemailer')


const sendMail = async(options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    try {
        const message = {
            from: `${process.env.FROM_NAME} <${process.env.USER_NAME}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.message
        }
        const info = await transporter.sendMail(message)
        console.log('Message sent successfully', info.messageId)

        return info
        
    } catch (error) {
        console.log(error)
    }
}
const username = "ola";
        const confirmation_link = "https://example.com/98765dfghj";
        const message = {
            email: "davidskenneth01@gmail.com",
            subject: 'HI Welcome to this platform',
            message: `
          <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Signup Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background-color: #fff;
                    padding: 20px;
                    border: 1px solid #ddd;
                }
                h1 {
                    color: #333;
                    font-size: 24px;
                }
                p {
                    color: #666;
                    font-size: 16px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Our Platform!</h1>
                <p>Hi ${username},</p>
                <p>Thank you for signing up. Please click the button below to confirm your email address and complete your registration:</p>
                <p><a href=${confirmation_link} class="button">Confirm Email</a></p>
                <p>If you didn’t sign up for this account, please ignore this email.</p>
                <div class="footer">
                    <p>© 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        
          `
        }
        
        


module.exports = {
    sendMail,
    message
}


