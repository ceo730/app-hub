import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.app.deleteMany();

  const apps = [
    {
      name: "Weather App",
      description: "실시간 날씨 정보를 확인할 수 있는 앱입니다. 현재 위치 기반으로 온도, 습도, 풍속 등을 보여줍니다.",
      url: "https://example.com/weather",
      icon: "🌤️",
      gradient: "from-blue-400 to-cyan-300",
      category: "Utility",
      order: 0,
    },
    {
      name: "Todo List",
      description: "할 일을 관리하는 심플한 투두 리스트입니다. 드래그 앤 드롭으로 순서를 변경할 수 있습니다.",
      url: "https://example.com/todo",
      icon: "✅",
      gradient: "from-green-400 to-emerald-500",
      category: "Productivity",
      order: 1,
    },
    {
      name: "Chat Bot",
      description: "AI 기반 챗봇 서비스입니다. Claude API를 활용하여 자연스러운 대화가 가능합니다.",
      url: "https://example.com/chatbot",
      icon: "🤖",
      gradient: "from-purple-500 to-pink-500",
      category: "AI",
      order: 2,
    },
    {
      name: "Calculator",
      description: "iOS 스타일의 계산기 앱입니다. 기본 사칙연산부터 공학용 계산까지 지원합니다.",
      url: "https://example.com/calculator",
      icon: "🧮",
      gradient: "from-orange-400 to-red-500",
      category: "Utility",
      order: 3,
    },
    {
      name: "Photo Gallery",
      description: "사진 갤러리 앱입니다. 이미지를 업로드하고 앨범별로 정리할 수 있습니다.",
      url: "https://example.com/gallery",
      icon: "📸",
      gradient: "from-yellow-400 to-orange-400",
      category: "Media",
      order: 4,
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
