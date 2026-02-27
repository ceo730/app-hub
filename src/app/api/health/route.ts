import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, unknown> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? "set (" + process.env.DATABASE_URL.replace(/\/\/.*@/, "//***@") + ")" : "NOT SET",
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  try {
    const { prisma } = await import("@/lib/prisma");
    const count = await prisma.app.count();
    checks.database = { connected: true, appCount: count };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    checks.database = { connected: false, error: msg };
    checks.status = "error";
  }

  return NextResponse.json(checks, {
    status: checks.status === "ok" ? 200 : 500,
  });
}
