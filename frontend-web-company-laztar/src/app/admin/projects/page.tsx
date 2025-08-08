"use client";

import { useState } from "react";
import Video from "@/src/component/video";
import { addVideo } from "@/src/servers/addVideo";
import rawVideoList from "@/data/linkVideo.json";
import ListVideo from "@/src/component/listVideo";
import CheckLogin from "@/src/component/checklogin";

export default function ProjectPage() {
  const videoList: Record<string, string> = rawVideoList.linkVideo;
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !url) return;

    addVideo(name, url); 
    setCurrentUrl(url);
    setName("");
    setUrl("");
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto mt-[100px] p-8 text-white flex flex-col gap-[20px]">
      <CheckLogin/>
      <ListVideo/>
      <form onSubmit={handleSubmit} className="w-[500px] flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[5px]">
          <label className="block mb-1 text-[16px]">Tên video</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-[#000000] bg-[#ffffff] rounded-[5px] text-[20px]"
            placeholder="Nhập tên video"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="block mb-1 text-[16px]">URL video</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 text-[#000000] bg-[#ffffff] rounded-[5px] text-[20px]"
            placeholder="Nhập URL YouTube"
          />
        </div>
        <button
          type="submit"
          className="w-fit h-[30px] px-[10px] py-[5px] bg-[#000000] text-[20px] text-[#ffffff] rounded-[5px] hover:bg-[#000fff]"
        >
          Thêm video
        </button>
      </form>

      {currentUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Video đã thêm:</h2>
          <Video url={currentUrl} />
        </div>
      )}
    </main>
  );
}