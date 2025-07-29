"use server"

import dns from 'dns';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Email không hợp lệ' }), { status: 400 });
  }

  const domain = email.split('@')[1];

  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err) {
        resolve(
          new Response(JSON.stringify({ error: 'Không thể truy vấn DNS', details: err.message }), {
            status: 500,
          })
        );
      } else {
        resolve(
          new Response(JSON.stringify({ validDomain: addresses.length > 0, mxRecords: addresses }), {
            status: 200,
          })
        );
      }
    });
  });
}