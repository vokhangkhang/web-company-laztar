"use server";

import nodemailer from "nodemailer";

export async function sendApply(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const message = formData.get("message")?.toString();
  const cv = formData.get("cv") as File;
  let attachments = [];

    if (cv instanceof File) {
    const buffer = await cv.arrayBuffer();

    attachments.push({
        filename: cv.name,
        content: Buffer.from(buffer),
        contentType: cv.type,
    });
    }

  // 🚀 Tạo transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // hoặc SMTP riêng
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: process.env.EMAIL_USERNAME,
    subject: `Liên hệ từ ${name}`,
    text: `Tên: ${name}\nEmail: ${email}\nPhone: ${phone}\nNội dung: ${message}`,
    replyTo: email,
    attachments,
  };

  await transporter.sendMail(mailOptions);
}
