'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckLogin() {
    const [userName, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        const user = sessionStorage.getItem('userName');

        if (!token) {
            router.push('/admin/login'); // ❌ Không có token, chuyển về login
        } else {
            setUserName(user || '');
        }
    }, []);

    return (
        <div className='w-full'></div>
    );
}