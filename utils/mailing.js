import nodemailer from "nodemailer";

import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, text, html) => {
  const send = await transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: `<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class="email-container" style = "max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            overflow: hidden;">
          <div class="header" style = "background:rgb(39, 133, 211);
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;">
            Welcome to Expense-Tracker!
          </div>
          <div class="body" style ="padding: 20px;
            color: #333333;
            line-height: 1.6;font-size: 18px;">
            <p>Hi there,</p>
            <p>Thank you for signing up to our expense tracking app. We're excited to have you onboard!</p>
            <p>Feel free to reach out if you have any questions.</p>
          </div>
          <div class="footer" style="text-align: center;
            background: #eeeeee;
            padding: 10px;
            font-size: 12px;
            color: #777777;">
            © 2025 Expense App. All Rights Reserved.
          </div>
        </div>
      </body>
    </html>`,
  });

  console.log("email sent", send);
};
