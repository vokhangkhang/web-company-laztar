"use client"
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Header from '@/src/component/Header'
import { sendApply } from '../actions/sendApply'

export default function CareersPage() {
  const [file, setFile] = useState<File | null>(null)
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  if (file) {
    formData.set("cv", file);
  }

  try {
    const res = await fetch("/api/send-apply", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Gửi thành công!");
    } else {
      alert("Gửi thất bại!");
    }
  } catch (error) {
    console.error(error);
    alert("Lỗi gửi dữ liệu!");
  }
  }

  return (
  <div className='w-full mx-auto'>
    <Header/>
    <form onSubmit={handleSubmit} className='flex flex-col gap-[50px] items-center justify-center p-[32px] mt-[100px]'>
      <input name="name" type="text" placeholder="Tên" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" type="tel" placeholder="Số điện thoại" required />
      <textarea name="message" placeholder="Nội dung" required />

      <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '10px', marginTop: '10px' }}>
        <input {...getInputProps()} name="cv" />
        {file ? <p>{file.name}</p> : <p>Kéo & thả CV vào đây hoặc click để chọn</p>}
      </div>

      <button type="submit">Gửi</button>
    </form>
  </div>
  )
}
