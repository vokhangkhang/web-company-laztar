"use server";

export async function getBase64FromUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const base64Raw = (await response.text()).trim();

    return `data:image/png;base64,${base64Raw}`;
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy base64:", error.message);
    throw new Error("Không thể lấy mã base64 từ URL.");
  }
}