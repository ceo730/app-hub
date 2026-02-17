import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  const { appId } = await params;
  const comments = await prisma.comment.findMany({
    where: { appId },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(comments);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  const { appId } = await params;
  const body = await request.json();

  if (!body.content?.trim() || !body.nickname?.trim()) {
    return NextResponse.json(
      { error: "Content and nickname are required" },
      { status: 400 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      content: body.content.trim(),
      nickname: body.nickname.trim(),
      appId,
    },
  });
  return NextResponse.json(comment, { status: 201 });
}
