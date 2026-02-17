"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NicknameInput from "./NicknameInput";

export default function CommentForm({ appId }: { appId: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname") as string;
    const content = formData.get("content") as string;

    if (!nickname?.trim() || !content?.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${appId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim(), content: content.trim() }),
      });
      if (res.ok) {
        formRef.current?.reset();
        const saved = localStorage.getItem("app-hub-nickname");
        if (saved) {
          const nicknameInput = formRef.current?.querySelector('input[name="nickname"]') as HTMLInputElement;
          if (nicknameInput) nicknameInput.value = saved;
        }
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="p-3 border-t border-white/10">
      <div className="flex gap-2">
        <div className="w-1/4">
          <NicknameInput />
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            name="content"
            placeholder="댓글을 입력하세요..."
            maxLength={500}
            required
            className="flex-1 bg-white/10 text-white placeholder-white/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-400/50 transition"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0"
          >
            {submitting ? "..." : "전송"}
          </button>
        </div>
      </div>
    </form>
  );
}
