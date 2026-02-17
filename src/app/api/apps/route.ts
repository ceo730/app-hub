import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const apps = await prisma.app.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { comments: true } } },
  });
  return NextResponse.json(apps);
}

export async function POST(request: Request) {
  const body = await request.json();
  const app = await prisma.app.create({
    data: {
      name: body.name,
      description: body.description,
      url: body.url,
      icon: body.icon,
      gradient: body.gradient,
      category: body.category || "Utility",
      order: body.order || 0,
    },
  });
  return NextResponse.json(app, { status: 201 });
}
