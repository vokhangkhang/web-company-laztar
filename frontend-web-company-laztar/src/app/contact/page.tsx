"use client"
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';


export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    target: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message);
  };
  const handleKeyNavigation = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const target = e.currentTarget;
    const form = target.form;
    if (!form) return;

    const elements = Array.from(form.elements).filter(
      (el) => el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ||el instanceof HTMLButtonElement
    ) as HTMLElement[];

    const index = elements.indexOf(target);

    const isTextarea = target.tagName === "TEXTAREA";

    if (target.tagName === "TEXTAREA" && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      // Tìm nút submit trong form
      const submitButton = elements.find(
        (el) => el instanceof HTMLButtonElement && (el as HTMLButtonElement).type === "submit"
      );

      submitButton?.focus?.(); // Focus vào nút Gửi
      return;
    }
    // ✅ Nếu là TEXTAREA và giữ Shift + Enter → xuống dòng như bình thường
    if (isTextarea && e.key === "Enter" && e.shiftKey) {
      return; // không ngăn gì cả
    }
    // ✅ Nếu là TEXTAREA và nhấn Enter bình thường → chuyển tới input kế tiếp
    if (isTextarea && e.key === "Enter") {
      e.preventDefault();
      elements[index + 1]?.focus?.();
      return;
    }

    // Nếu là input (không phải textarea), Enter vẫn chuyển tiếp như bình thường
    if (!isTextarea && e.key === "Enter") {
      e.preventDefault();
      elements[index + 1]?.focus?.();
      return;
    }

    // Không xử lý điều hướng nếu đang giữ các modifier key
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

    const caretAtEnd =
      target.selectionStart === target.value.length &&
      target.selectionStart === target.selectionEnd;

    const caretAtStart =
      target.selectionStart === 0 &&
      target.selectionStart === target.selectionEnd;

    if (e.key === "ArrowRight" && caretAtEnd) {
      e.preventDefault();
      elements[(index + 1) % elements.length]?.focus();
    } else if (e.key === "ArrowLeft" && caretAtStart) {
      e.preventDefault();
      elements[(index - 1 + elements.length) % elements.length]?.focus();
    }
  };

  return (
  <div className="w-full max-w-[1440px] pt-[96px] px-[112px] pb-[64px] max-lg:px-[16px] max-lg:pb-[24px]">             
            <form onSubmit={handleSubmit} className="flex w-full max-w-[1216px] gap-[136px] max-lg:flex-col max-lg:items-center max-lg:gap-[24px] bg-[#ffffff]">
              <div className="flex flex-col w-full max-w-[592px] gap-[64px]">
                <div className="flex flex-col gap-[32px]">
                    <p className="font-mono text-[60px] leading-[68px] text-[#000000] max-lg:text-center max-lg:text-[48px]">Chúng ta hãy nói chuyện nhé !</p>
                    <p className="font-mono text-[20px] leading-[24px] max-lg:text-center max-lg:text-[18px]">Bạn có thương hiệu, trang web, sản phẩm hoặc chỉ là một ý tưởng? Hãy liên hệ!</p>
                </div> 
                <div className="flex flex-col gap-[32px]">              
                  <div className="flex gap-[32px]"> 
                      <input name="email" type="email" placeholder="Email" onChange={handleChange} required onKeyDown={handleKeyNavigation} className="border-b border-gray-400 p-2 w-full" />             
                      <input name="name" placeholder="Tên" onChange={handleChange} required onKeyDown={handleKeyNavigation} className="border-b border-gray-400 p-2 w-full" />                   
                  </div>
                  <div className="flex gap-[32px]">  
                      <input name="company" placeholder="Công ty" onChange={handleChange} onKeyDown={handleKeyNavigation} className="border-b border-gray-400 p-2 w-full" />
                      <input name="phone" placeholder="Số điện thoại" onChange={handleChange} required onKeyDown={handleKeyNavigation} className="border-b border-gray-400 p-2 w-full" />   
                  </div>
                </div>
               <textarea name="target" placeholder="target" required onKeyDown={handleKeyNavigation}
                      className="border-b border-gray-400 p-2 max-w-[592px] h-[120px]" />               
                <button type="submit" className="bg-[#0E1821] text-white rounded-[6px] w-[73px] text-[14px] gap-[6px] px-[12px] py[6px]">
                Gửi
                </button>
              </div>
            </form>       
    </div>
  );
}