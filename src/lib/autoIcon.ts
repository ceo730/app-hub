// 키워드 → 이모지 매핑 (이름 + 설명에서 매칭)
const KEYWORD_EMOJIS: [string[], string][] = [
  // 날씨
  [["weather", "날씨", "기상", "온도", "기온"], "🌤️"],
  // 할일 / 메모
  [["todo", "투두", "할 일", "할일", "체크", "task"], "✅"],
  [["memo", "메모", "note", "노트", "필기"], "📝"],
  // 채팅 / 메신저
  [["chat", "챗", "채팅", "messenger", "메신저", "대화", "톡"], "💬"],
  [["bot", "봇", "ai", "gpt", "claude", "인공지능"], "🤖"],
  // 계산기
  [["calc", "계산", "calculator"], "🧮"],
  // 사진 / 갤러리
  [["photo", "사진", "gallery", "갤러리", "camera", "카메라"], "📸"],
  [["video", "비디오", "영상", "동영상", "movie", "영화"], "🎬"],
  [["music", "음악", "뮤직", "노래", "song", "player"], "🎵"],
  // 쇼핑 / 결제
  [["shop", "쇼핑", "store", "스토어", "마켓", "market", "구매"], "🛒"],
  [["pay", "결제", "payment", "금융", "은행", "bank", "money", "돈"], "💳"],
  // 지도 / 네비
  [["map", "지도", "navi", "네비", "위치", "location", "길찾기"], "🗺️"],
  // 건강 / 피트니스
  [["health", "건강", "fitness", "피트니스", "운동", "exercise", "헬스"], "💪"],
  [["hospital", "병원", "의료", "medical", "약", "medicine"], "🏥"],
  // 음식
  [["food", "음식", "restaurant", "레스토랑", "식당", "배달", "delivery", "recipe", "레시피", "요리", "cook"], "🍽️"],
  // 책 / 교육
  [["book", "책", "read", "읽기", "독서", "library", "도서"], "📚"],
  [["learn", "학습", "study", "공부", "교육", "education", "강의", "course", "class", "수업"], "📖"],
  [["quiz", "퀴즈", "시험", "exam", "test"], "🎓"],
  // 게임
  [["game", "게임", "play", "플레이"], "🎮"],
  [["puzzle", "퍼즐"], "🧩"],
  // 소셜
  [["social", "소셜", "sns", "community", "커뮤니티", "friend", "친구"], "👥"],
  [["blog", "블로그", "글", "포스트", "post", "write"], "✍️"],
  // 개발
  [["code", "코드", "dev", "개발", "programming", "프로그래밍", "github"], "💻"],
  [["api", "서버", "server", "backend", "백엔드"], "⚡"],
  [["design", "디자인", "figma", "ui", "ux"], "🎨"],
  // 일정 / 캘린더
  [["calendar", "캘린더", "일정", "schedule", "스케줄"], "📅"],
  [["clock", "시계", "timer", "타이머", "alarm", "알람", "시간"], "⏰"],
  // 파일 / 저장
  [["file", "파일", "storage", "저장", "cloud", "클라우드", "drive", "드라이브"], "📁"],
  [["download", "다운로드", "upload", "업로드"], "📥"],
  // 보안
  [["security", "보안", "password", "비밀번호", "lock", "잠금", "vpn"], "🔒"],
  // 번역
  [["translate", "번역", "language", "언어", "사전", "dictionary"], "🌐"],
  // 검색
  [["search", "검색", "find", "찾기"], "🔍"],
  // 뉴스
  [["news", "뉴스", "신문", "기사"], "📰"],
  // 날씨
  [["travel", "여행", "trip", "투어", "tour", "항공", "flight"], "✈️"],
  // 설정
  [["setting", "설정", "config", "환경"], "⚙️"],
  // 전화
  [["phone", "전화", "call", "콜", "연락"], "📞"],
  // 메일
  [["mail", "메일", "email", "이메일"], "📧"],
];

// 카테고리별 기본 이모지
const CATEGORY_EMOJIS: Record<string, string> = {
  Utility: "🔧",
  Productivity: "📋",
  AI: "🤖",
  Media: "🎬",
  Game: "🎮",
  Social: "👥",
  Education: "📚",
};

// 카테고리별 추천 그라디언트
const CATEGORY_GRADIENTS: Record<string, string> = {
  Utility: "from-blue-400 to-cyan-300",
  Productivity: "from-green-400 to-emerald-500",
  AI: "from-purple-500 to-pink-500",
  Media: "from-yellow-400 to-orange-400",
  Game: "from-orange-400 to-red-500",
  Social: "from-pink-400 to-rose-500",
  Education: "from-indigo-400 to-blue-500",
};

function matchKeyword(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keywords, emoji] of KEYWORD_EMOJIS) {
    if (keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return emoji;
    }
  }
  return null;
}

export function pickEmoji(name: string, description: string, category: string): string {
  // 1순위: 설명에서 키워드 매칭
  if (description.trim()) {
    const fromDesc = matchKeyword(description);
    if (fromDesc) return fromDesc;
  }

  // 2순위: 이름에서 키워드 매칭
  if (name.trim()) {
    const fromName = matchKeyword(name);
    if (fromName) return fromName;
  }

  // 3순위: 카테고리 기본 이모지
  return CATEGORY_EMOJIS[category] || "📱";
}

export function pickGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] || "from-blue-400 to-cyan-300";
}
