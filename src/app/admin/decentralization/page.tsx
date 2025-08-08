'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'manager' | 'user';

interface UserData {
  userName: string;
  email: string;
  role: UserRole;
}

export default function DecentralizationPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role !== 'admin') {
      router.push('/admin'); // Không có quyền truy cập
      return;
    }
    setCurrentUserRole(role);

    // Load user data
    fetch('/api/decentralization')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || 'Không thể tải dữ liệu người dùng');
        }
      })
      .catch(() => {
        setError('Lỗi khi kết nối đến máy chủ.');
      });
  }, [router]);

  const handleRoleChange = async (userName: string, newRole: UserRole) => {
    const res = await fetch('/api/decentralization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, role: newRole })
    });

    const data = await res.json();
    if (data.success) {
      setUsers(prev =>
        prev.map(user =>
          user.userName === userName ? { ...user, role: newRole } : user
        )
      );
    } else {
      alert(data.message || 'Không thể cập nhật quyền.');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Quản lý phân quyền người dùng</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Tên người dùng</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Quyền</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userName} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{user.userName}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.role}</td>
              <td style={{ padding: '10px' }}>
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user.userName, e.target.value as UserRole)}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}