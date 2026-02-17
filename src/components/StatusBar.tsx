"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-2 text-white text-sm font-semibold">
      <span className="w-20">{time}</span>
      <div className="w-32 h-7 bg-black rounded-full mx-auto" />
      <div className="flex items-center gap-1.5 w-20 justify-end">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="9" width="3" height="3" rx="0.5" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM3.46 7.04a6.5 6.5 0 019.08 0l-1.06 1.06a5 5 0 00-6.96 0L3.46 7.04zM.93 4.51a10 10 0 0114.14 0L14.01 5.6a8.5 8.5 0 00-12.02 0L.93 4.51z" />
        </svg>
        <svg width="27" height="12" viewBox="0 0 27 12" fill="white">
          <rect x="0" y="0" width="23" height="12" rx="3" fill="none" stroke="white" strokeWidth="1" />
          <rect x="1.5" y="1.5" width="20" height="9" rx="1.5" />
          <rect x="24" y="3.5" width="3" height="5" rx="1" />
        </svg>
      </div>
    </div>
  );
}
