import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.app.count();
  if (count > 0) {
    console.log("DB already has data, skipping seed.");
    return;
  }

  const apps = [
    {
      name: "Sample App",
      description: "샘플 앱입니다. 관리자 페이지에서 수정하세요.",
      url: "https://example.com",
      icon: "📱",
      gradient: "from-blue-400 to-cyan-300",
      category: "기타",
      order: 0,
    },
  ];

  for (const app of apps) {
    await prisma.app.create({ data: app });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
