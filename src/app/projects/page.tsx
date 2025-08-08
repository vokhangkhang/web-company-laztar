"use client";

import { useState } from "react";
import Video from "@/src/component/video";
import Header from "@/src/component/Header";
import rawVideoList from "@/data/linkVideo.json";
import ListVideo from "@/src/component/listVideo";

export default function ProjectPage() {
  const videoList: Record<string, string> = rawVideoList.linkVideo;

  const [searchName, setSearchName] = useState("");
  const [matchedVideos, setMatchedVideos] = useState<{ name: string; url: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearch = () => {
    const keyword = searchName.trim().toLowerCase();

    const matched = Object.entries(videoList).filter(([key]) =>
      key.toLowerCase().includes(keyword)
    );

    const videos = matched.map(([name, url]) => ({ name, url }));
    setMatchedVideos(videos);
    setCurrentPage(0);
  };

  const totalPages = matchedVideos.length;
  const currentVideo = matchedVideos[currentPage];

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div>
      <Header />
      <main className="w-full max-w-[1440px] mx-auto mt-[100px] p-[20px] text-white flex flex-col gap-[20px]">
        <h1 className="text-2xl font-bold mb-4">Tìm video theo tên</h1>

        <div className="flex gap-[5px]">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Nhập tên video (ví dụ: video1 hoặc List Nhạc Lao Tâm Khổ Tứ)"
            className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#000000] bg-[#ffffff] w-full"
          />
          <button
            onClick={handleSearch}
            className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000] hover:bg-[#000fff]"
          >
            Tìm
          </button>
        </div>

        {matchedVideos.length > 0 ? (
          <div className="flex flex-col items-center gap-[10px]">
            <div className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000]">
              {currentVideo.name}
            </div>

            <Video url={currentVideo.url} />

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000] hover:bg-[#000fff]"
              >
                Trước
              </button>
              <h2 className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000]">({currentPage + 1}/{totalPages})</h2>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="px-[10px] py-[5px] rounded-[5px] text-[20px] text-[#ffffff] bg-[#000000] hover:bg-[#000fff]"
              >
                Sau
              </button>
            </div>
          </div>
        ) : (
          searchName && (
            <ListVideo/>
          )
        )}
      </main>
    </div>
  );
}