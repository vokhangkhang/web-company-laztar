"use client";

import { getBase64FromUrl } from '@/src/app/actions/getBase64FromUrl';
import { useEffect, useState } from "react";
import Header from '@/src/component/Header';
import styles from "@/src/app/css/FloatingInput.module.css"
import { useDropzone } from 'react-dropzone'

export default function BlogPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const [resGetData, setResGetData] = useState<string | null>(null);

  async function getData(url: string | null) {
    if (!url) {
    console.warn('URL is null, skipping request.');
    return;
  }

  const getUrl = encodeURIComponent(url);

    const response = await fetch(`https://api-dev.laztar.com/api/v1/files/presigned-url?url=${getUrl}`, {
      method: 'GET'
    });

    const data = await response.json();
    setResGetData(data.body?.url);
  }
  getData("https://seo-website-laztar.s3.us-east-1.amazonaws.com/images/1752812237001_contactForm.png");
  useEffect(() => {
  if (resGetData) {
    console.log('Updated resGetData:', resGetData);
  }
}, [resGetData]);

  const imageUrl = `${resGetData}` ;
   useEffect(() => {
    const fetchImage = async () => {
      const image = await getBase64FromUrl(imageUrl);
      setImageSrc(image as string);
      console.log("Base64:", image);
    };
    fetchImage();
  }, []);
  const [file, setFile] = useState<File | null>(null)
    const { getRootProps, getInputProps } = useDropzone({
      accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
      onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    })
  const [resPostData, setResPostData] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const response = await fetch('https://api-dev.laztar.com/api/v1/files/upload', {
      method: 'POST',
      body: formData 
    });

    const data = await response.json();
    setResPostData(data.message);
  }

   return (
    <main className="flex flex-col items-center gap-6">
      <Header></Header>
      <div className='w-fit mt-[100px] flex gap-[50px]'>
        {imageSrc && (
          <img src={imageSrc} alt="Base64 preview"/>
        )}
        <form action={handleSubmit} className='flex flex-col gap-[50px] items-center justify-center p-[32px] mt-[100px]'>

          <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '10px', marginTop: '10px' }}>
            <input {...getInputProps()} name="cv" />
            {file ? <p>{file.name}</p> : <p>Kéo & thả CV vào đây hoặc click để chọn</p>}
          </div>

          <button type="submit">Gửi</button>
        </form>
      </div>
    </main>
  );
}