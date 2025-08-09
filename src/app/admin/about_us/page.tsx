"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TargetItem = {
  value: string;
  date: string;
};

type UserData = {
  name: string;
  phone: string;
  company: string;
  target: TargetItem[];
};

export default function ListUserPage() {
  const router = useRouter();
  const [users, setUsers] = useState<{ email: string; data: UserData }[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (role !== "admin" && role !== "manager") {
      router.push("/admin"); // Không có quyền truy cập
      return;
    }

    setCurrentUserRole(role);

    fetch("/api/listUser")
      .then((res) => res.json())
      .then((data) => {
        const formatted = Object.entries(data).map(([email, info]) => ({
          email,
          data: info as UserData,
        }));
        setUsers(formatted);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, [router]);

  if (currentUserRole !== "admin") {
    return null; // Hoặc loading spinner
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto mt-[100px] p-[20px]">
      <h1 className="text-2xl font-bold mb-6">Danh sách người dùng</h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Tên</th>
              <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
              <th className="border border-gray-300 px-4 py-2">Công ty</th>
              <th className="border border-gray-300 px-4 py-2">Mục tiêu</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.data.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.data.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{user.data.company}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc pl-4" style={{ listStylePosition: "inside", paddingLeft: 0, margin: 0 }}>
                    {user.data.target.map((t, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{t.value}</span>{" "}
                        <span className="text-gray-500 text-sm">({t.date})</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}