import Link from "next/link";

interface AppIconProps {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  commentCount?: number;
}

export default function AppIcon({ id, name, icon, gradient, commentCount }: AppIconProps) {
  return (
    <Link href={`/apps/${id}`} className="flex flex-col items-center gap-1.5 group">
      <div className="app-icon-press relative">
        <div
          className={`w-16 h-16 sm:w-[72px] sm:h-[72px] squircle bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:shadow-xl transition-shadow`}
        >
          {icon}
        </div>
        {commentCount !== undefined && commentCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm shadow-red-500/40">
            {commentCount > 99 ? "99+" : commentCount}
          </div>
        )}
      </div>
      <span className="text-white text-[11px] sm:text-xs text-center w-20 leading-tight line-clamp-2 drop-shadow-md">
        {name}
      </span>
    </Link>
  );
}
