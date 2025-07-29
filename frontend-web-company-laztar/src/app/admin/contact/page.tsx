"use client";
import { useState } from "react";
import { sendVerificationCode, verifyCode } from "@/src/app/actions/checkEmail";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [result, setResult] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    const res = await sendVerificationCode(formData);

    if (res.codeSent) {
      setCodeSent(true);
      setResult("✅ Mã xác minh đã được gửi tới email");
    } else {
      setResult("❌ Gửi mã xác minh thất bại");
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", userCode);

    const res = await verifyCode(formData);

    if (res.verified) {
      setResult("✅ Xác minh thành công");
    } else {
      setResult("❌ Mã không đúng hoặc đã hết hạn");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <form onSubmit={handleSendCode} className="flex flex-col gap-[5px]">
        <input
          type="email"
          value={email}
          placeholder="Nhập email của bạn"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-[220px] h-[40px] px-2 rounded border bg-[#ffffff] text-[#000000]"
        />
        <button type="submit" className="border-[2px] border-[#000000] bg-[#000fff] text-[#ffffff] px-4 py-2 rounded-[5px] h-[20px]">
          Gửi mã xác minh
        </button>
      </form>

      {codeSent && (
        <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
          <input
            type="text"
            value={userCode}
            placeholder="Nhập mã từ email"
            onChange={(e) => setUserCode(e.target.value)}
            required
            className="w-[220px] h-[40px] px-2 rounded border bg-[#ffffff] text-[#000000]"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Xác minh
          </button>
        </form>
      )}

      {result && (
        <p className="text-[18px] bg-black text-white mt-[20px] px-4 py-2 rounded">
          {result}
        </p>
      )}
    </div>
  );
}