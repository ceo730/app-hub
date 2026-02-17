import CommentBubble from "./CommentBubble";
import CommentForm from "./CommentForm";

interface Comment {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({
  appId,
  comments,
}: {
  appId: string;
  comments: Comment[];
}) {
  return (
    <div className="glass-card rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="px-5 py-3 border-b border-white/10">
        <h2 className="text-white font-semibold text-sm">
          댓글 <span className="text-white/40 ml-0.5">{comments.length}개</span>
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {comments.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-10">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentBubble
              key={comment.id}
              nickname={comment.nickname}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          ))
        )}
      </div>
      <CommentForm appId={appId} />
    </div>
  );
}
