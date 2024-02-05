import nodemailer from "nodemailer";
import prisma from "../libs/prismadb";
import bcryptjs from "bcryptjs";

type EmailType = "VERIFY" | "RESET";

interface sendEmailParams {
  email: string;
  emailType: EmailType;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId, 10);

    let updateData = {};

    if (emailType === "VERIFY") {
      updateData = {
        verifyToken: hashedToken,
        // 1 hour from now
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      };
    } 
    // else {
    //   if (emailType === "RESET") {
    //     updateData = {
    //       forgetPasswordToken: hashedToken,
    //       // 1 hour from now
    //       forgetPasswordTokenExpiry: new Date(Date.now() + 3600000),
    //     };
    //   }
    // }

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    //transporter for sending email
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: 'gmail',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptios = {
        from: "support@thexpresssalon.com",
        to: email,
        subject: emailType === 'VERIFY' ? "Verify your mail" : "Reset your password",
        html: `<p>Click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
        or copy and paste the link below in your browser. <br> ${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${hashedToken}
        </p>` 
    }

    const mailResponse = await transport.sendMail(mailOptios);
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message);
  }
};
