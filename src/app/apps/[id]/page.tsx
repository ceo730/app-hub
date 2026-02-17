import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import AppInfoPanel from "@/components/AppInfoPanel";
import CommentSection from "@/components/CommentSection";

export const dynamic = "force-dynamic";

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const app = await prisma.app.findUnique({
    where: { id },
    include: {
      comments: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!app) notFound();

  const comments = app.comments.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <div className="ios-wallpaper min-h-screen min-h-dvh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium mb-6 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          돌아가기
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
          {/* Left - App Info */}
          <div className="lg:w-2/5">
            <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-6">
              <AppInfoPanel app={app} />
            </div>
          </div>

          {/* Right - Comments */}
          <div className="lg:w-3/5 h-[60vh] lg:h-[80vh]">
            <CommentSection appId={app.id} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
