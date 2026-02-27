import { prisma } from "@/lib/prisma";
import StatusBar from "@/components/StatusBar";
import AppGrid from "@/components/AppGrid";
import Dock from "@/components/Dock";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const apps = await prisma.app.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { comments: true } } },
    });

    return (
      <div className="ios-wallpaper flex flex-col h-screen h-dvh">
        <StatusBar />
        <div className="flex-1 flex flex-col pt-4 pb-0 overflow-hidden">
          <AppGrid apps={apps} />
        </div>
        <Dock />
      </div>
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">DB 연결 오류</h1>
          <p className="text-gray-400 mb-4">데이터베이스에 연결할 수 없습니다.</p>
          <pre className="bg-gray-800 rounded p-4 text-left text-sm text-red-400 overflow-auto">{msg}</pre>
        </div>
      </div>
    );
  }
}
