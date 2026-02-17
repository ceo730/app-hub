import Link from "next/link";

export default function Dock() {
  return (
    <div className="px-6 pb-6 pt-2">
      <div className="dock-glass mx-auto max-w-md flex items-center justify-around py-3 px-6">
        <Link href="/" className="flex flex-col items-center gap-0.5 app-icon-press">
          <div className="w-12 h-12 squircle bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl shadow-md">
            🏠
          </div>
          <span className="text-white/80 text-[10px]">Home</span>
        </Link>
        <Link href="/admin" className="flex flex-col items-center gap-0.5 app-icon-press">
          <div className="w-12 h-12 squircle bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-2xl shadow-md">
            ⚙️
          </div>
          <span className="text-white/80 text-[10px]">Admin</span>
        </Link>
      </div>
    </div>
  );
}
