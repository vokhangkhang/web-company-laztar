"use client"

import { useState } from "react";
import Image from "next/image";
import { sliceImage } from "@/src/servers/dropImage";
import Header from "@/src/component/Header";
import { useDropzone } from 'react-dropzone'

export default function ServicesPage() {
  const [inputPath, setInputPath] = useState("");
  const [outputDir, setOutputDir] = useState("");
  const [name, setName] = useState("");
  const [numberOfSlices, setNumberOfSlices] = useState(1);
  const [slices, setSlices] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  })

    const handleDrop = async () => {
    if (!file || !name || numberOfSlices <= 0) return;

    setIsProcessing(true);

    try {
      // 1. Upload ảnh lên server
      const formData = new FormData();
      formData.append('image', file);

      const uploadRes = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        console.error('Upload thất bại:', uploadData.message);
        setIsProcessing(false);
        return;
      }

      // 2. Gán đường dẫn ảnh từ server trả về
      const savedFilePath = uploadData.path;
      setInputPath(savedFilePath);

      // 3. Gọi hàm cắt ảnh
      const slicePaths = await sliceImage(savedFilePath, "slices" , name, numberOfSlices);
      setSlices(slicePaths);
    } catch (err) {
      console.error('Lỗi xử lý:', err);
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <Header />
      <main className="w-full max-w-[1440px] mx-auto mt-[100px] p-[20px] flex flex-col gap-[10px]">
        <h1 className="text-[20px] font-[600]">Cắt ảnh thành nhiều phần</h1>

        <div className="flex flex-col w-full gap-[5px]">
          <label htmlFor="image">Tải ảnh lên</label>
          <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '10px', marginTop: '10px' }}>
            <input {...getInputProps()} name="image" />
            {file ? <p>{file.name}</p> : <p>Kéo & thả CV vào đây hoặc click để chọn</p>}
          </div>
          <label htmlFor="nameImage">Tên các ảnh(name-stt)</label>
          <input
            type="text"
            name="nameImage"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên ảnh (ví dụ: so)"
            className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#000000] bg-[#ffffff]"
          />
          <label htmlFor="nuberImage">Số ảnh muốn cắt thành</label>
          <input
            type="number"
            name="nuberImage"
            value={numberOfSlices}
            onChange={(e) => setNumberOfSlices(Number(e.target.value))}
            placeholder="Số phần cắt (ví dụ: 13)"
            className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#000000] bg-[#ffffff]"
            min={1}
          />
        </div>

        <button
          onClick={handleDrop}
          className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000] hover:bg-[#000fff] w-fit"
          disabled={isProcessing}
        >
          {isProcessing ? "Đang xử lý..." : "Cắt ảnh"}
        </button>

        <div className="grid grid-cols-4 gap-[10px]">
          {slices.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Slice ${index + 1}`}
              width={350}
              height={175}
              className="border-[2px] border-[#000000]"
            />
          ))}
        </div>
      </main>
    </div>
  );
}