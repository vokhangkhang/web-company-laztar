"use server";

import fs from "fs/promises";
import path from "path";

const filePath = path.resolve(process.cwd(), "data/linkVideo.json");

export const addVideo = async (name: string, url: string): Promise<void> => {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    // Thêm hoặc cập nhật video
    data.linkVideo[name] = url;

    // Ghi lại file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Lỗi khi ghi file JSON:", error);
    throw new Error("Không thể cập nhật video");
  }
};