"use client";

import { useState } from "react";
import rawVideoList from "@/data/linkVideo.json";

export default function ListVideo() {
  const videoList: Record<string, string> = rawVideoList.linkVideo;
  const itemsPerPage = 10;
  const videoKeys = Object.keys(videoList);
  const totalPages = Math.ceil(videoKeys.length / itemsPerPage);
  const [currentListPage, setCurrentListPage] = useState(0);
  const startIndex = currentListPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentKeys = videoKeys.slice(startIndex, endIndex);
  

  return (
      <div className="flex flex-col gap-[20px]">
        <p className="text-[20px] text-[#000000]">List video hiện có (Trang {currentListPage + 1}/{totalPages})</p>

        <ul className="list-disc ml-[10px] flex flex-col gap-[20px] text-[#000000] text-[20px]">
          {currentKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => setCurrentListPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentListPage === 0}
            className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000] hover:bg-[#000fff]"
          >
            Trước
          </button>
          <h2 className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000]">({currentListPage + 1}/{totalPages})</h2>
          <button
            onClick={() => setCurrentListPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentListPage === totalPages - 1}
            className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000] hover:bg-[#000fff]"
          >
            Sau
          </button>
        </div>
      </div>
  );
}