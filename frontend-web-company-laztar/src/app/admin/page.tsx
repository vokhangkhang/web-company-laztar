"use client"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

type Book = {
  id: string;
  title: string;
  image: string;
  price: number;
  available: number;
  description: string;
  categoryData?: {
    value?: string;
  };
};
export function BookForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const [login, setLogin] = useState(false);
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setLogin(true);
      }
    }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setError('Vui lòng chọn ảnh.');
      return;
    }
    try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('available',available);
    formData.append('category_code', categoryCode);
    formData.append('image', image);

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZV9jb2RlIjoiUjEiLCJpYXQiOjE3NTIxMTY3ODYsImV4cCI6MTc1MjU0ODc4Nn0.FwGhP9eGZkEYCAXjMP-W5-d6eBqPzW_IN3W_ifFUUkc'; // Thay bằng token thực tế

    const response = await fetch('http://localhost:5000/api/v1/book/', {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.err === 0) {
        setMessage('✅ Tạo sách thành công!');
        setTitle('');
        setDescription('');
        setPrice('');
        setAvailable('');
        setCategoryCode('');
        setImage(null);
        setPreview('');
        setError('');
      } else {
        setError(`❌ Lỗi: ${data.mes || 'Không thể tạo sách.'}`);
        setMessage('');
      }
    } catch (err) {
      setError('❌ Đã xảy ra lỗi khi gửi dữ liệu.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ padding: '2rem', display:"flex", flexDirection: "column", gap: "20px"}}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Available (số lượng)" value={available} onChange={(e) => setAvailable((e.target.value))} required/>
      <input type="text" placeholder="Category Code" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <div style={{width: '300px', height: '300px', border: '2px dashed #999', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', marginTop: '1rem', overflow: 'hidden',position: 'relative' }}>
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span style={{ color: '#666' }}>Chưa có ảnh</span>
        )}
      </div>

      <button type="submit" style={{height:"25px"}}>Tạo sách</button>
      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </form>
  );
}



export default function AdminPage() {
  
  const [books, setBooks] = useState<Book[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/book/?limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.bookData?.rows)) {
          setBooks(data.bookData.rows);
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi fetch:", error);
      });
  }, []);
  const handleSearch = () => {
    fetch(`http://localhost:5000/api/v1/book/?name=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.bookData?.rows)) {
          setBooks(data.bookData.rows);
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi fetch:", error);
      });
  };
  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100vw", marginTop:'15vh'}}>
      <div style={{marginBottom: "1rem", display: "flex", gap: "0.5rem"}}>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Nhập tên sách"
          style={{border: "1px solid #ccc", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", width: "100%",flexGrow: 1,}}
        />

        <motion.button onClick={handleSearch} whileHover={{   backgroundColor: '#0000FF',   color: '#fff' }} transition={{ duration: 0.3 }}
          style={{backgroundColor: "#3b82f6", padding: "0.5rem 1rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", width:"10vw"}}
        >
          Tìm kiếm
        </motion.button>
      </div>

      <div style={{display: "flex", width: "100vw", marginTop:"10px", gap:"10px"}}>
        <img style={{width:"30vw", height:'70vh'}} src={books[0]?.image}/>
        <div style={{display: "flex", flexDirection: "column", gap:"30px", marginTop:"10px"}}>
          <p style={{fontSize:"30px"}}>Tên sách: {books[0]?.title}</p>
          <p style={{fontSize:"20px"}}>Giá: {books[0]?.price} VND</p>
          <p style={{fontSize:"20px"}}>Số sách hiện có: {books[0]?.available}</p>
          <p style={{fontSize:"20px"}}>Nội dung sách: {books[0]?.description}</p>
        </div>
      </div>
      <div style={{ padding: '2rem', display:"flex", flexDirection: "column", gap: "20px"}}>
        <h1>Upload</h1>
        <BookForm />
      </div>
    </div>
  );
}