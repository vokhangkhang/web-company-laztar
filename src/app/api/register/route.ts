import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const dataPath = path.join(process.cwd(), 'data', 'auth.json');
const KEY_PASSWORD = process.env.KEY_PASSWORD || '';

type AuthMap = Record<string, string>; // username → hashed password
type InfoMap = Record<string, string>; // username → email

export async function POST(req: Request) {
  try {
    const { userName, passWord, email } = await req.json();

    if (!userName || !passWord || !email) {
      return NextResponse.json(
        { message: 'Vui lòng cung cấp đầy đủ thông tin.' },
        { status: 400 }
      );
    }

    // Đọc file auth.json
    let jsonData: { auth: AuthMap; informationUser: InfoMap } = {
      auth: {},
      informationUser: {}
    };

    try {
      const fileData = await fs.readFile(dataPath, 'utf8');
      jsonData = JSON.parse(fileData);
    } catch {
      // File chưa tồn tại thì dùng giá trị mặc định
    }

    const auth: AuthMap = jsonData.auth || {};
    const informationUser: InfoMap = jsonData.informationUser || {};

    // Kiểm tra username đã tồn tại
    if (auth[userName]) {
      return NextResponse.json(
        { message: 'Tên đăng nhập đã tồn tại.' },
        { status: 409 }
      );
    }

    // Kiểm tra email đã được sử dụng
    const emailExists = Object.values(informationUser).includes(email);
    if (emailExists) {
      return NextResponse.json(
        { message: 'Email đã được sử dụng.' },
        { status: 409 }
      );
    }

    // Hash mật khẩu kèm KEY_PASSWORD
    const hashedPassword = await bcrypt.hash(passWord + KEY_PASSWORD, 10);

    // Lưu dữ liệu
    auth[userName] = hashedPassword;
    informationUser[userName] = email;

    const newData = {
      ...jsonData,
      auth,
      informationUser
    };

    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8');

    return NextResponse.json({ message: 'Tạo tài khoản thành công.' }, { status: 201 });
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err);
    return NextResponse.json({ message: 'Lỗi máy chủ.' }, { status: 500 });
  }
}