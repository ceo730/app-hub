import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const app = await prisma.app.findUnique({
    where: { id },
    include: {
      comments: { orderBy: { createdAt: "asc" } },
      _count: { select: { comments: true } },
    },
  });
  if (!app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }
  return NextResponse.json(app);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const app = await prisma.app.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      url: body.url,
      icon: body.icon,
      gradient: body.gradient,
      category: body.category,
      order: body.order,
    },
  });
  return NextResponse.json(app);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.app.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
