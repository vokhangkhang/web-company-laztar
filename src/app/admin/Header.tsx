'use client'

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('accessToken');
      const storedRole = sessionStorage.getItem('role');
      setIsLoggedIn(!!token);
      setRole(storedRole);
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
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
    <nav style={{
      position: 'absolute',
      width: '100vw',
      height: '10vh',
      background: '#ffffff',
      top: '0%',
      left: '0%'
    }}>
      <a href='/admin/'>
        <motion.div
          style={{ width: '8vw', height: '13vh' }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          <img
            src="/images/logo-page.jpg"
            style={{ width: '10vw', height: '10vh', cursor: 'pointer', borderRadius: "50%" }}
            alt="logo"
          />
        </motion.div>
      </a>

      {role === 'admin' && (
        <a href='/admin/decentralization'>
          <button style={{
            cursor: 'pointer',
            background: '#171717',
            color: '#ffffff',
            borderRadius: '0.5em',
            position: 'absolute',
            top: '5%',
            right: '5%',
            width: '10%',
            height: '50%'
          }}>
            Quản lý User
          </button>
        </a>
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
        <a href='/admin/login'>
          <button style={{
            cursor: 'pointer',
            background: '#171717',
            color: '#ffffff',
            borderRadius: '0.5em',
            position: 'absolute',
            top: '5%',
            right: '0%',
            width: '5%',
            height: '50%'
          }}>
            Login
          </button>
        </a>
      )}

      <div style={{
        width: '100vw',
        position: 'absolute',
        top: '1vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <a href='/admin/' style={{ cursor: 'pointer', fontSize: '150%' }}>Home</a>
        <a href='/admin/about_us' style={{ cursor: 'pointer', marginLeft: '5%', fontSize: '150%' }}>About us</a>
        <a href='/admin/services' style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Services</a>
        <a href='/admin/projects' style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Update video</a>
        <a href='/admin/careers' style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Careers</a>
        <a href='/admin/blog' style={{ cursor: 'pointer', marginLeft: '3%', fontSize: '150%' }}>Blog</a>
      </div>
    </nav>
  );
};

export default Header;