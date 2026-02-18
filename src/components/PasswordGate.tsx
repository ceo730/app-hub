"use client";

import { useState, useEffect } from "react";

const CORRECT_PASSWORD = "1212";
const STORAGE_KEY = "app-hub-auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  }

  if (checking) return null;

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="ios-wallpaper min-h-screen min-h-dvh flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-8 w-full max-w-sm animate-fade-in text-center"
      >
        <div className="text-4xl mb-4">🔒</div>
        <h1 className="text-white text-xl font-bold mb-2">App Hub</h1>
        <p className="text-white/50 text-sm mb-6">접속하려면 비밀번호를 입력하세요</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="비밀번호 입력"
          autoFocus
          className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-center text-lg tracking-widest outline-none focus:ring-1 focus:ring-blue-400/50 transition"
        />
        {error && (
          <p className="text-red-400 text-sm mt-2 animate-fade-in">
            비밀번호가 틀렸습니다
          </p>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20"
        >
          확인
        </button>
      </form>
    </div>
  );
}
