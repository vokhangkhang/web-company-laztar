"use server";
import nodemailer from "nodemailer";
let codeStore: { [email: string]: string } = {};
export async function sendVerificationCode(formData: FormData) {
  const email = formData.get("email")?.toString();
  if (!email) return { success: false, message: "Email không hợp lệ" };

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  codeStore[email] = verificationCode;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      to: email,
      subject: "Mã xác minh của bạn",
      text: `Mã xác minh của bạn là: ${verificationCode}`,
    });

    return {
      success: true,
      codeSent: true,
    };
  } catch (error: any) {
    return {
      success: false,
      codeSent: false,
      message: "Lỗi khi gửi mã xác minh",
      error: error.message,
    };
  }
}
export async function verifyCode(formData: FormData) {
  const email = formData.get("email")?.toString();
  const code = formData.get("code")?.toString();

  if (!email || !code) return { success: false, message: "Thiếu thông tin để xác minh" };

  const storedCode = codeStore[email];
  if (storedCode && storedCode === code) {
    delete codeStore[email];
    return { success: true, verified: true };
  } else {
    return { success: false, verified: false, message: "Mã không chính xác hoặc đã hết hạn" };
  }
}