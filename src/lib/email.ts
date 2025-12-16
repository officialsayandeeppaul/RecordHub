import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "RecordHub"}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

export function getWelcomeEmailTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000000; margin: 0; font-size: 28px;">Welcome to RecordHub!</h1>
          </div>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Thank you for joining RecordHub! We're excited to have you on board.
          </p>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            With RecordHub, you can:
          </p>
          <ul style="color: #333333; font-size: 16px; line-height: 1.8;">
            <li>Create and manage records efficiently</li>
            <li>Organize with custom categories</li>
            <li>Track due dates and priorities</li>
            <li>Search and filter your data</li>
          </ul>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.AUTH_URL || "https://record-hub.vercel.app"}/dashboard" 
               style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Go to Dashboard
            </a>
          </div>
          <p style="color: #666666; font-size: 14px; margin-top: 40px; text-align: center;">
            If you have any questions, feel free to reach out.
          </p>
        </div>
        <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 20px;">
          © ${new Date().getFullYear()} RecordHub. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getPasswordResetTemplate(name: string, resetLink: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000000; margin: 0; font-size: 28px;">Reset Your Password</h1>
          </div>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Reset Password
            </a>
          </div>
          <p style="color: #666666; font-size: 14px; line-height: 1.6;">
            This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
          <p style="color: #999999; font-size: 12px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetLink}" style="color: #666666; word-break: break-all;">${resetLink}</a>
          </p>
        </div>
        <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 20px;">
          © ${new Date().getFullYear()} RecordHub. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getDueDateReminderTemplate(name: string, recordTitle: string, dueDate: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000000; margin: 0; font-size: 28px;">⏰ Due Date Reminder</h1>
          </div>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            This is a reminder that your record <strong>"${recordTitle}"</strong> is due on <strong>${dueDate}</strong>.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.AUTH_URL || "https://record-hub.vercel.app"}/records" 
               style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              View Records
            </a>
          </div>
        </div>
        <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 20px;">
          © ${new Date().getFullYear()} RecordHub. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
}
