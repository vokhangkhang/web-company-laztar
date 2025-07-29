import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, target } = body;

    const transporter = nodemailer.createTransport({

      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME, // 👈 Đặt trong .env.local
        pass: process.env.EMAIL_PASSWORD, // 👈 App password nếu dùng Gmail
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,             // ✅ địa chỉ email Gmail của bạn
      replyTo: email,   
      to: process.env.MANAGER_EMAIL, // 👈 Email người quản lý
      subject: `Liên hệ từ ${name}`,
      text: `Tên: ${name}\nEmail: ${email}\nĐiện thoại: ${phone}\nCông ty: ${company}\nMục tiêu: ${target}`,
    });

    return NextResponse.json({ message: "Gửi thành công!" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    return NextResponse.json({ message: "Gửi thất bại!" }, { status: 500 });
  }
}