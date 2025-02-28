import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function sendEmail({email, emailType, userId}: any) {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "c43b57655adaf1",
            pass: "b9e90084bd16be"
            }
        });

        const mailOptions = {
            from: "somanath2314@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
            <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
            <p>Or click this link to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            <p>${emailType === "VERIFY" ? "Or copy and paste this link in your browser" : "Or copy and paste this link in your browser"}</p>
            <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        throw new Error("Failed to send email");
    }
}