export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'auth.json');

export async function GET() {
  try {
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const auth = jsonData.auth || {};
    const info = jsonData.informationUser || {};
    const roles = jsonData.decentralization || {};

    const users = Object.keys(auth).map(userName => ({
      userName,
      email: info[userName] || 'Chưa có',
      role: roles[userName] || 'user',
    }));

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Lỗi khi đọc dữ liệu.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userName, role } = await req.json();
    if (!userName || !role) {
      return NextResponse.json({ success: false, message: 'Thiếu thông tin.' }, { status: 400 });
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    if (!data.auth[userName]) {
      return NextResponse.json({ success: false, message: 'Người dùng không tồn tại.' }, { status: 404 });
    }

    data.decentralization[userName] = role;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Cập nhật phân quyền thành công.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Lỗi khi ghi dữ liệu.' }, { status: 500 });
  }
}