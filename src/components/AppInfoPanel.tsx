"use client";

interface AppInfoPanelProps {
  app: {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: string;
    gradient: string;
    category: string;
  };
}

export default function AppInfoPanel({ app }: AppInfoPanelProps) {
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다!");
    } catch {
      prompt("URL을 복사하세요:", url);
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        className={`w-28 h-28 sm:w-32 sm:h-32 squircle bg-gradient-to-br ${app.gradient} flex items-center justify-center text-6xl sm:text-7xl shadow-2xl`}
      >
        {app.icon}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{app.name}</h1>
        <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10">
          {app.category}
        </span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed max-w-xs">
        {app.description}
      </p>
      <div className="flex gap-3 w-full max-w-xs">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-2xl text-sm transition-colors text-center shadow-lg shadow-blue-500/25"
        >
          실행하기
        </a>
        <button
          onClick={handleShare}
          className="flex-1 glass text-white font-semibold py-3 rounded-2xl text-sm hover:bg-white/20 transition-colors"
        >
          공유하기
        </button>
      </div>
    </div>
  );
}
