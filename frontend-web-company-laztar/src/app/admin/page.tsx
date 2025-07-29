"use client"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { BookForm } from "@/src/component/bookForm";

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