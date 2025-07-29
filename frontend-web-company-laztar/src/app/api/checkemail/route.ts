"use server";

import { NextResponse } from 'next/server';
import dns from 'dns/promises'; // dùng bản hỗ trợ Promise của dns

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
  }

  const domain = email.split('@')[1];

  try {
    const addresses = await dns.resolveMx(domain);
    return NextResponse.json({
      validDomain: addresses.length > 0,
      mxRecords: addresses,
    });
  } catch (err: any) {
    return NextResponse.json({
      error: 'Không thể truy vấn DNS',
      details: err.message,
    }, { status: 500 });
  }
}