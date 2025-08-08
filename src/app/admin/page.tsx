'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckLogin from '@/src/component/checklogin';

export default function AdminPage() {
 

    return (
        <div className='w-full mx-auto max-w-[1440px] flex flex-col gap-[10px] p-[50px] mt-[100px]'>
            <CheckLogin/>
            <p className='text-[20px] text-[#000000]'>Đây là trang quản trị admin.</p>
        </div>
    );
}