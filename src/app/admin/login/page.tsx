'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, passWord }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(data.message || 'Đăng nhập thành công!');
                sessionStorage.setItem('accessToken', data.token); // ✅ Lưu token
                sessionStorage.setItem('userName', data.user);
                sessionStorage.setItem('role', data.role);
                window.dispatchEvent(new Event('authChanged'));
                router.push('/admin'); // Chuyển hướng nếu cần
            } else {
                setError(data.message || 'Đăng nhập thất bại.');
            }
        } catch (err) {
            setError('Lỗi kết nối đến máy chủ.');
        }
    };
      const handleRegisterRedirect = () => {
      router.push('/admin/register');
    };
    return (
        <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                    <label htmlFor="userName">Tên đăng nhập OR Email</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        placeholder="Tên đăng nhập hoặc Email"
                        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
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
                        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Đăng nhập
                </button>
            </form>
            <a href="/admin/forgotPassword" className='text-[16px] leading-[24px] mt-[10px]'>Quên mật khẩu?</a>
            <button
              type="button"
              onClick={handleRegisterRedirect}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#eaeaea',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                marginTop: '10px'
              }}
            >
              Chưa có tài khoản? Đăng ký
            </button>
            {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '12px' }}>{success}</p>}
        </div>
    );
}