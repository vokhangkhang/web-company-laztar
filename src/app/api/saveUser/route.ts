// app/api/saveUser/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getNowDate() {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

export async function POST(req: Request) {
  try {
    const { email, name, phone, company, target } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "listUser.json");

    // Đọc dữ liệu cũ
    let data: Record<string, any> = {};
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      data = fileData ? JSON.parse(fileData) : {};
    }

    // Ép target thành mảng object kèm ngày
    let normalizedTarget: { value: string; date: string }[] = [];
    if (Array.isArray(target)) {
      normalizedTarget = target
        .filter(t => typeof t === "string" && t.trim() !== "")
        .map(t => ({ value: t, date: getNowDate() }));
    } else if (typeof target === "string" && target.trim() !== "") {
      normalizedTarget = [{ value: target, date: getNowDate() }];
    }

    // Merge dữ liệu cũ
    const existingUser = data[email] || {};
    const existingTargets = Array.isArray(existingUser.target)
      ? existingUser.target
      : [];

    // Append nhưng tránh trùng target.value

    type TargetItem = { value: string; date: string };
    const updatedTargets = [
      ...existingTargets,
      ...normalizedTarget.filter(
        (nt: TargetItem) => !existingTargets.some((et: TargetItem) => et.value === nt.value)
        )
    ];

    data[email] = {
      name: name ?? existingUser.name,
      phone: phone ?? existingUser.phone,
      company: company ?? existingUser.company,
      target: updatedTargets
    };

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ success: true, message: "User saved successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}