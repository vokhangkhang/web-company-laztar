import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'auth.json');

export async function POST(req: Request) {
  try {
    const { userName, passWord, email } = await req.json();

    if (!userName || !passWord || !email) {
      return NextResponse.json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' }, { status: 400 });
    }

    // Đọc file auth.json
    const fileData = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(fileData);

    const auth = jsonData.auth || {};
    const informationUser = jsonData.informationUser || {};

    // Kiểm tra username đã tồn tại
    if (auth[userName]) {
      return NextResponse.json({ message: 'Tên đăng nhập đã tồn tại.' }, { status: 409 });
    }

    // Kiểm tra email đã được sử dụng
    const emailExists = Object.values(informationUser).includes(email);
    if (emailExists) {
      return NextResponse.json({ message: 'Email đã được sử dụng.' }, { status: 409 });
    }

    // Ghi thêm user
    auth[userName] = passWord;
    informationUser[userName] = email;

    const newData = {
      auth,
      informationUser
    };

    // Ghi đè vào file
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf8');

    return NextResponse.json({ message: 'Tạo tài khoản thành công.' }, { status: 201 });
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err);
    return NextResponse.json({ message: 'Lỗi máy chủ.' }, { status: 500 });
  }
}