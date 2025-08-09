'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passWord !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, passWord, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Tạo tài khoản thành công! Chuyển hướng đến trang đăng nhập...');
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setError(data.message || 'Lỗi khi tạo tài khoản.');
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Tạo tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="userName">Tên đăng nhập</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', background: "#ffffff", color:"#000000" }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="passWord">Mật khẩu</label>
          <input
            type="password"
            id="passWord"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', background: "#ffffff", color:"#000000" }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', background: "#ffffff", color:"#000000" }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', background: "#ffffff", color:"#000000" }}
        />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Đăng ký
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '12px' }}>{success}</p>}
    </div>
  );
}