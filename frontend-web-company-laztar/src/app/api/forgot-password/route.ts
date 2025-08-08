import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "auth.json");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin." });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileData);

    const userName = Object.keys(json.informationUser).find(
      (key) => json.informationUser[key] === email
    );

    if (!userName) {
      return NextResponse.json({ success: false, message: "Email không tồn tại." });
    }

    json.auth[userName] = password;

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Lỗi server", error: error.message });
  }
}