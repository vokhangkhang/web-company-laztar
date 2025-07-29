import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // ⚠️ Chỉ áp dụng với pages router. Với app router sẽ cần xử lý FormData thủ công.
    },
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData(); // dùng NextRequest để lấy dữ liệu

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const message = formData.get("message")?.toString();
  const cv = formData.get("cv") as File;

  const attachments: any[] = [];

  if (cv instanceof File) {
    const buffer = await cv.arrayBuffer();

    attachments.push({
      filename: cv.name,
      content: Buffer.from(buffer),
      contentType: cv.type,
    });
  }

  // Gửi mail
  const transporter = nodemailer.createTransport({
    service: "Gmail",
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

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}