'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('accessToken');
      const storedRole = sessionStorage.getItem('role');
      setIsLoggedIn(!!token);
      setRole(storedRole);
    };

    checkAuth();
    window.addEventListener('authChanged', checkAuth);

    return () => {
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChanged'));
    router.push('/admin/login');
  };

  return (
    <nav
      style={{
        position: 'absolute',
        width: '100vw',
        height: '10vh',
        background: '#ffffff',
        top: '0%',
        left: '0%'
      }}
    >
      <Link href="/admin">
        <motion.div
          style={{ width: '8vw', height: '13vh' }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
         <Image
            src="/imagepage/logo-page.jpg"
            alt="logo"
            width={50}
            height={50}
            style={{ borderRadius: '50%', cursor: 'pointer' }}
          />
        </motion.div>
      </Link>

      {role === 'admin' && (
        <Link href="/admin/decentralization">
          <button
            style={{
              cursor: 'pointer',
              background: '#171717',
              color: '#ffffff',
              borderRadius: '0.5em',
              position: 'absolute',
              top: '5%',
              right: '5%',
              width: '10%',
              height: '50%'
            }}
          >
            Quản lý User
          </button>
        </Link>
      )}

      {isLoggedIn ? (
        <button
          onClick={logout}
          style={{
            cursor: 'pointer',
            background: '#171717',
            color: '#ffffff',
            borderRadius: '0.5em',
            position: 'absolute',
            top: '5%',
            right: '0%',
            width: '5%',
            height: '50%'
          }}
        >
          Logout
        </button>
      ) : (
        <Link href="/admin/login">
          <button
            style={{
              cursor: 'pointer',
              background: '#171717',
              color: '#ffffff',
              borderRadius: '0.5em',
              position: 'absolute',
              top: '5%',
              right: '0%',
              width: '5%',
              height: '50%'
            }}
          >
            Login
          </button>
        </Link>
      )}

      <div
        style={{
          width: '100vw',
          position: 'absolute',
          top: '1vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Link href="/admin" style={{ cursor: 'pointer', fontSize: '150%' }}>Home</Link>
        {(role === "admin" || role === "manager") && (
        <Link href="/admin/about_us" style={{ cursor: 'pointer', marginLeft: '5%', fontSize: '150%' }}>Yêu cầu khách hàng</Link>
        )}
        <Link href="/admin/services" style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Services</Link>
        <Link href="/admin/projects" style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Update video</Link>
        <Link href="/admin/careers" style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Careers</Link>
        <Link href="/admin/blog" style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Blog</Link>
      </div>
    </nav>
  );
};

export default Header;