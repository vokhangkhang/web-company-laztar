import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = process.env.JWT_SECRET || 'your_secret_key';
const KEY_PASSWORD = process.env.KEY_PASSWORD || '';
const filePath = path.join(process.cwd(), 'data', 'auth.json');

export async function POST(req: NextRequest) {
  const { userName, passWord } = await req.json();

  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    const { auth, informationUser } = data;

    // Tìm username tương ứng nếu nhập email
    let realUser = userName;
    if (!auth[userName]) {
      const foundUser = Object.entries(informationUser).find(
        ([user, email]) => email === userName
      );
      if (foundUser) realUser = foundUser[0];
    }

    const storedPasswordHash = auth[realUser]; // hash trong file auth.json

    // So sánh mật khẩu (plain + key) với hash
    const isValid = storedPasswordHash
      ? await bcrypt.compare(passWord + KEY_PASSWORD, storedPasswordHash)
      : false;

    if (isValid) {
      const token = jwt.sign({ user: realUser }, SECRET, { expiresIn: '1h' });
      const role = data.decentralization?.[realUser] || 'user';
      return NextResponse.json({
        success: true,
        message: 'Đăng nhập thành công',
        token,
        user: realUser,
        role,
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Sai tài khoản hoặc mật khẩu' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ' },
      { status: 500 }
    );
  }
}