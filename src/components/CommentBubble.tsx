interface CommentBubbleProps {
  nickname: string;
  content: string;
  createdAt: string;
}

export default function CommentBubble({ nickname, content, createdAt }: CommentBubbleProps) {
  const time = new Date(createdAt).toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex flex-col gap-1 animate-fade-in">
      <div className="flex items-baseline gap-2 ml-1">
        <span className="text-[11px] text-white/50 font-semibold">{nickname}</span>
        <span className="text-[10px] text-white/25">{time}</span>
      </div>
      <div className="chat-bubble chat-bubble-left bg-white/10 max-w-[85%]">
        <p className="text-white text-sm leading-relaxed break-words">{content}</p>
      </div>
    </div>
  );
}
