"use client";
import { useState } from "react";
import { handleKeyNavigation } from "@/src/component/handleKeyNavigation";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      // Gửi email
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert(result.message);

      // Lưu user
      await fetch("/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-[1440px] pt-[96px] px-[112px] pb-[64px] max-lg:px-[16px] max-lg:pb-[24px]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[1216px] gap-[136px] max-lg:flex-col max-lg:items-center max-lg:gap-[24px] bg-[#ffffff]"
      >
        <div className="flex flex-col w-full max-w-[592px] gap-[64px]">
          <div className="flex flex-col gap-[32px]">
            <p className="font-mono text-[60px] leading-[68px] text-[#000000] max-lg:text-center max-lg:text-[48px]">
              Chúng ta hãy nói chuyện nhé !
            </p>
            <p className="font-mono text-[20px] leading-[24px] max-lg:text-center max-lg:text-[18px]">
              Bạn có thương hiệu, trang web, sản phẩm hoặc chỉ là một ý tưởng?
              Hãy liên hệ!
            </p>
          </div>

          <div className="flex flex-col gap-[32px]">
            <div className="flex gap-[32px]">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                onKeyDown={handleKeyNavigation}
                className="bg-[#ffffff] p-[5px] text-[20px] text-[#000000] w-full"
              />
              <input
                name="name"
                placeholder="Tên"
                onChange={handleChange}
                required
                onKeyDown={handleKeyNavigation}
                className="bg-[#ffffff] p-[5px] text-[20px] text-[#000000] w-full"
              />
            </div>

            <div className="flex gap-[32px]">
              <input
                name="company"
                placeholder="Công ty"
                onChange={handleChange}
                onKeyDown={handleKeyNavigation}
                className="bg-[#ffffff] p-[5px] text-[20px] text-[#000000] w-full"
              />
              <input
                name="phone"
                placeholder="Số điện thoại"
                onChange={handleChange}
                required
                onKeyDown={handleKeyNavigation}
                className="bg-[#ffffff] p-[5px] text-[20px] text-[#000000] w-full"
              />
            </div>
          </div>

          <textarea
            name="target"
            placeholder="target"
            required
            onChange={handleChange}
            onKeyDown={handleKeyNavigation}
            className="bg-[#ffffff] p-[5px] text-[20px] text-[#000000] w-full max-w-[592px] h-[120px]"
          />

          <button
            type="submit"
            disabled={sending}
            className="bg-[#0E1821] text-white rounded-[6px] w-[73px] text-[14px] gap-[6px] px-[12px] py-[6px]"
          >
            {sending ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
}