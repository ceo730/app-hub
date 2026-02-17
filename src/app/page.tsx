import { prisma } from "@/lib/prisma";
import StatusBar from "@/components/StatusBar";
import AppGrid from "@/components/AppGrid";
import Dock from "@/components/Dock";

export const dynamic = "force-dynamic";

export default async function Home() {
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
}
