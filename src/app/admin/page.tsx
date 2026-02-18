"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { pickEmoji, pickGradient } from "@/lib/autoIcon";

interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  gradient: string;
  category: string;
  order: number;
}

const GRADIENTS = [
  "from-blue-400 to-cyan-300",
  "from-green-400 to-emerald-500",
  "from-purple-500 to-pink-500",
  "from-orange-400 to-red-500",
  "from-yellow-400 to-orange-400",
  "from-pink-400 to-rose-500",
  "from-indigo-400 to-blue-500",
  "from-teal-400 to-green-500",
];

const CATEGORIES = ["기존사업체", "커머스앱", "기타"];

const emptyForm = {
  name: "",
  description: "",
  url: "",
  icon: "",
  gradient: GRADIENTS[0],
  category: "기존사업체",
  order: 0,
  iconManual: false, // 수동 이모지 입력 여부
};

export default function AdminPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchApps = useCallback(async () => {
    const res = await fetch("/api/apps");
    const data = await res.json();
    setApps(data);
  }, []);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const submitData = {
      name: form.name,
      description: form.description,
      url: form.url,
      icon: effectiveIcon,
      gradient: effectiveGradient,
      category: form.category,
      order: form.order,
    };
    try {
      if (editingId) {
        await fetch(`/api/apps/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });
      } else {
        await fetch("/api/apps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });
      }
      setForm(emptyForm);
      setEditingId(null);
      await fetchApps();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`/api/apps/${id}`, { method: "DELETE" });
    await fetchApps();
  }

  function handleEdit(app: App) {
    setForm({
      name: app.name,
      description: app.description,
      url: app.url,
      icon: app.icon,
      gradient: app.gradient,
      category: app.category,
      order: app.order,
      iconManual: true,
    });
    setEditingId(app.id);
  }

  // 이름/설명/카테고리가 바뀔 때 자동 이모지 + 그라디언트 매칭
  const autoIcon = useMemo(
    () => pickEmoji(form.name, form.description, form.category),
    [form.name, form.description, form.category]
  );
  const autoGradient = useMemo(
    () => pickGradient(form.category),
    [form.category]
  );

  // 수동 입력이 아닌 경우 자동 값 사용
  const effectiveIcon = form.iconManual && form.icon ? form.icon : autoIcon;
  const effectiveGradient = form.gradient;

  const inputClass =
    "bg-white/10 text-white placeholder-white/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-400/50 transition";

  return (
    <div className="ios-wallpaper min-h-screen min-h-dvh">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">App Manager</h1>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            홈으로
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 mb-6 animate-fade-in">
          <h2 className="text-white font-semibold mb-4">
            {editingId ? "앱 수정" : "새 앱 추가"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="앱 이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputClass} />
            <input type="text" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required className={inputClass} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, gradient: pickGradient(e.target.value) })} className={inputClass}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
              ))}
            </select>
            <input type="number" placeholder="순서" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className={inputClass} />
            <textarea
              placeholder="설명"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={2}
              className={`sm:col-span-2 ${inputClass} resize-none`}
            />
          </div>

          {/* Auto Icon Preview */}
          <div className="mt-4 flex items-center gap-4">
            <div className={`w-14 h-14 squircle bg-gradient-to-br ${effectiveGradient} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
              {effectiveIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium">{form.name || "앱 이름"}</div>
              <div className="text-white/40 text-xs mt-0.5">설명 기반 자동 매칭</div>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, iconManual: !form.iconManual })}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors shrink-0"
            >
              {form.iconManual ? "자동으로" : "직접 선택"}
            </button>
          </div>

          {/* Manual Icon Input (토글) */}
          {form.iconManual && (
            <div className="mt-3 flex gap-3 items-center">
              <input
                type="text"
                placeholder="이모지 입력 (예: 🎮)"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className={`${inputClass} w-48`}
              />
              <select value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })} className={`${inputClass} flex-1`}>
                {GRADIENTS.map((g) => (
                  <option key={g} value={g} className="bg-gray-900">{g}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20"
            >
              {loading ? "처리 중..." : editingId ? "수정" : "추가"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setEditingId(null); }}
                className="glass text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors"
              >
                취소
              </button>
            )}
          </div>
        </form>

        {/* App List */}
        <div className="glass-card rounded-2xl overflow-hidden animate-slide-up">
          <div className="px-5 py-3 border-b border-white/10">
            <h2 className="text-white font-semibold text-sm">앱 목록 ({apps.length})</h2>
          </div>
          <div className="divide-y divide-white/5">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors"
              >
                <div className={`w-10 h-10 squircle-sm bg-gradient-to-br ${app.gradient} flex items-center justify-center text-lg shrink-0 shadow-md`}>
                  {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{app.name}</div>
                  <div className="text-white/40 text-xs truncate">{app.url}</div>
                </div>
                <span className="text-white/30 text-xs shrink-0">{app.category}</span>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(app)} className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                    수정
                  </button>
                  <button onClick={() => handleDelete(app.id)} className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors">
                    삭제
                  </button>
                </div>
              </div>
            ))}
            {apps.length === 0 && (
              <div className="px-4 py-8 text-center text-white/30 text-sm">
                등록된 앱이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
