import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const foldersToClear = [
  path.join(process.cwd(), "public", "images"),
  path.join(process.cwd(), "public", "slices"),
];

export async function POST() {
  try {
    for (const folder of foldersToClear) {
      try {
        const files = await fs.readdir(folder);
        for (const file of files) {
          await fs.unlink(path.join(folder, file));
        }
      } catch (err) {
        console.error(`Không thể xóa thư mục: ${folder}`, err);
      }
    }
    return NextResponse.json({ success: true, message: "Đã xóa ảnh thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa ảnh:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}