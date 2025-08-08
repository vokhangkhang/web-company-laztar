'use client';
import Header from "@/src/component/Header";
import { useState, useRef } from 'react';


export default function About_usPage() {

  const [activeIndex, setActiveIndex] = useState(0);
  const slides = ['Khối 1', 'Khối 2', 'Khối 3', 'Khối 4'];
  const startX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
      if (startX.current === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX.current - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && activeIndex < slides.length - 1) {
          setActiveIndex(activeIndex + 1); // Vuốt trái
        } else if (diff < 0 && activeIndex > 0) {
          setActiveIndex(activeIndex - 1); // Vuốt phải
        }
      }

      startX.current = null;
    };


  return (
  <main>
      <Header />
      <div className="relative overflow-hidden w-[500px] mt-[200px]"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((text, i) => (
            <div
              key={i}
              className="min-w-full p-10 text-center bg-[#2D2D2D] text-[#ffffff]"
            >
              {text}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-[10px]">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`w-[10px] h-[10px] mx-1  rounded-full cursor-pointer transition-colors duration-300 ${
                activeIndex === i ? 'bg-[#000000]' : 'bg-[#C0C0C0]'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </main> 
  );
}