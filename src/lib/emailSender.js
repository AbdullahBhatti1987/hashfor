import nodemailer from 'nodemailer';
import { showSuccessToast,showErrorToast } from './toast';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: "k11662275@gmail.com",
    pass: "iwqcordsfkrvtwaj",
  },
});

export const sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: "k11662275@gmail.com",
      to: email,
      subject: 'Your Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Hashfor Password Reset Request</h2>
          <p>Your OTP for password reset of Hashfor is:</p>
          <div style="background: #f3f4f6; padding: 10px; border-radius: 5px; display: inline-block;">
            <h3 style="margin: 0; letter-spacing: 3px;">${otp}</h3>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    showSuccessToast(`OTP email sent to ${email}`);
  } catch (error) {
    showErrorToast('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};