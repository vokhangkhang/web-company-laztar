"use client";
import { useState } from "react";
import { sendVerificationCode, verifyCode } from "@/src/app/actions/checkEmail";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    const formData = new FormData();
    formData.append("email", email);
    const res = await sendVerificationCode(formData);
    if (res.success) {
      setStep("verify");
      setMessage("Đã gửi mã xác nhận tới email.");
    } else {
      setMessage(res.message || "Lỗi khi gửi mã.");
    }
  };

  const handleVerifyCode = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", code);
    const res = await verifyCode(formData);
    if (res.success) {
      setStep("reset");
      setMessage("Xác nhận thành công. Nhập mật khẩu mới.");
    } else {
      setMessage(res.message || "Mã xác nhận sai.");
    }
  };

  const handleResetPassword = async () => {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email, password: newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      alert("Đổi mật khẩu thành công! Hãy đăng nhập lại.");
      window.location.href = "/admin/login";
    } else {
      setMessage(data.message || "Lỗi khi đổi mật khẩu.");
    }
  };

  return (
    <div className="w-full max-w-[1400px] p-[100px]">
      <h1>Quên mật khẩu</h1>
      <p>{message}</p>

      {step === "email" && (
        <>
          <input
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-[20px] text-[#000000] leading-[25px] p-[3px] bg-[#ffffff]"
          />
          <button onClick={handleSendCode} className="text-[20px] text-[#ffffff] leading-[25px] p-[3px] bg-[#000000] hover:bg-[#000fff]">Gửi mã xác nhận</button>
        </>
      )}

      {step === "verify" && (
        <>
          <input
            placeholder="Nhập mã xác nhận"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-[20px] text-[#000000] leading-[25px] p-[3px] bg-[#ffffff]"
          />
          <button className="text-[20px] text-[#ffffff] leading-[25px] p-[3px] bg-[#000000] hover:bg-[#000fff]" onClick={handleVerifyCode}>Xác nhận</button>
        </>
      )}

      {step === "reset" && (
        <>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-[20px] text-[#000000] leading-[25px] p-[3px] bg-[#ffffff]"
          />
          <button className="text-[20px] text-[#ffffff] leading-[25px] p-[3px] bg-[#000000] hover:bg-[#000fff]" onClick={handleResetPassword}>Đặt lại mật khẩu</button>
        </>
      )}
    </div>
  );
}