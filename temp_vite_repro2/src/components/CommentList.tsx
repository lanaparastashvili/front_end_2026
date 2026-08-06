import React, { useState } from 'react';
import type { Comment } from '../types/comment';
import { CommentCard, ReplyBox } from './CommentCard';
import { currentUser } from '../data/comments';

interface CommentListProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const generateId = () => Date.now().toString();

// ---- Helpers to operate on nested comment tree ----

function voteComment(comments: Comment[], id: string, diff: 1 | -1): Comment[] {
  return comments.map((c) => {
    if (c.id === id) return { ...c, votes: c.votes + diff };
    if (c.replies?.length) return { ...c, replies: voteComment(c.replies, id, diff) };
    return c;
  });
}

function deleteComment(comments: Comment[], id: string): Comment[] {
  return comments
    .filter((c) => c.id !== id)
    .map((c) => ({
      ...c,
      replies: c.replies ? deleteComment(c.replies, id) : [],
    }));
}

function editComment(comments: Comment[], id: string, content: string): Comment[] {
  return comments.map((c) => {
    if (c.id === id) return { ...c, content };
    if (c.replies?.length) return { ...c, replies: editComment(c.replies, id, content) };
    return c;
  });
}

function addReply(comments: Comment[], parentId: string, reply: Comment): Comment[] {
  return comments.map((c) => {
    if (c.id === parentId) return { ...c, replies: [...(c.replies || []), reply] };
    if (c.replies?.length) return { ...c, replies: addReply(c.replies, parentId, reply) };
    return c;
  });
}

function getAuthor(comments: Comment[], id: string): string {
  for (const c of comments) {
    if (c.id === id) return c.author;
    if (c.replies?.length) {
      const found = getAuthor(c.replies, id);
      if (found) return found;
    }
  }
  return '';
}

// ---- Recursive Comment Thread ----

interface CommentThreadProps {
  comment: Comment;
  allComments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  depth?: number;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comment, allComments, setComments, depth = 0 }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReply = (id: string) => {
    setReplyingTo(id === replyingTo ? null : id);
  };

  const handleReplySubmit = (parentId: string, content: string) => {
    const parentAuthor = getAuthor(allComments, parentId);
    const newReply: Comment = {
      id: generateId(),
      author: currentUser.author,
      avatar: currentUser.avatar,
      timestamp: 'just now',
      content,
      votes: 0,
      isOwn: true,
      replyingTo: parentAuthor,
      replies: [],
    };
    setComments((prev) => addReply(prev, parentId, newReply));
    setReplyingTo(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <CommentCard
        comment={comment}
        depth={depth}
        onReply={handleReply}
        onDelete={(id) => setComments((prev) => deleteComment(prev, id))}
        onEdit={(id, content) => setComments((prev) => editComment(prev, id, content))}
        onVote={(id, diff) => setComments((prev) => voteComment(prev, id, diff))}
      />

      {replyingTo === comment.id && (
        <ReplyBox
          replyingTo={comment.author}
          onSubmit={(content) => handleReplySubmit(comment.id, content)}
          onCancel={() => setReplyingTo(null)}
        />
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 ml-3">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              allComments={allComments}
              setComments={setComments}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Main Comment List ----

const CommentList: React.FC<CommentListProps> = ({ comments, setComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: generateId(),
      author: currentUser.author,
      avatar: currentUser.avatar,
      timestamp: 'just now',
      content: newComment.trim(),
      votes: 0,
      isOwn: true,
      replies: [],
    };
    setComments((prev) => [...prev, comment]);
    setNewComment('');
  };

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentThread
          key={comment.id}
          comment={comment}
          allComments={comments}
          setComments={setComments}
        />
      ))}

      {/* New Comment Box */}
      <div className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 items-start">
        <img
          src={currentUser.avatar}
          alt={currentUser.author}
          className="w-10 h-10 rounded-full object-cover bg-indigo-100 flex-shrink-0 mt-1"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAddComment();
          }}
          rows={3}
          placeholder="Add a comment..."
          className="flex-1 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
        <button
          onClick={handleAddComment}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default CommentList;
