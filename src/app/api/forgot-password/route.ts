import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), "data", "auth.json");
const KEY_PASSWORD = process.env.KEY_PASSWORD || "";

type AuthMap = Record<string, string>;
type InfoMap = Record<string, string>;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin." },
        { status: 400 }
      );
    }

    // Đọc file
    let jsonData: { auth: AuthMap; informationUser: InfoMap } = {
      auth: {},
      informationUser: {},
    };

    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      jsonData = JSON.parse(fileData);
    } catch {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy dữ liệu người dùng." },
        { status: 404 }
      );
    }

    const userName = Object.keys(jsonData.informationUser).find(
      (key) => jsonData.informationUser[key] === email
    );

    if (!userName) {
      return NextResponse.json(
        { success: false, message: "Email không tồn tại." },
        { status: 404 }
      );
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password + KEY_PASSWORD, 10);

    // Cập nhật mật khẩu
    jsonData.auth[userName] = hashedPassword;

    // Lưu lại file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Đặt lại mật khẩu thành công.",
    });
  } catch (error: any) {
    console.error("Lỗi khi đặt lại mật khẩu:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}