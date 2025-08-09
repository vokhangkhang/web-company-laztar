import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Đường dẫn tuyệt đối tới file listUser.json
    const filePath = path.join(process.cwd(), 'data', 'listUser.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Không đọc được file listUser.json' },
      { status: 500 }
    );
  }
}