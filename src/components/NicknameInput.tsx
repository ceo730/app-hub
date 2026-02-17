"use client";

import { useEffect, useState } from "react";

export default function NicknameInput() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("app-hub-nickname");
    if (saved) setValue(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    localStorage.setItem("app-hub-nickname", e.target.value);
  };

  return (
    <input
      type="text"
      name="nickname"
      value={value}
      onChange={handleChange}
      placeholder="닉네임"
      maxLength={20}
      required
      className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-400/50 transition"
    />
  );
}
