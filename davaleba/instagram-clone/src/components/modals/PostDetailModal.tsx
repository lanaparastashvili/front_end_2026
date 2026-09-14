import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Trash2, Smile } from 'lucide-react';
import { Post, Comment } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onPostUpdated: (updatedPost: Post) => void;
  onSelectUser?: (userId: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  isOpen,
  onClose,
  onPostUpdated,
  onSelectUser,
}) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !post) return null;

  const handleLike = async () => {
    const res = await api.toggleLikePost(post.id);
    onPostUpdated({
      ...post,
      isLiked: res.isLiked,
      likesCount: res.likesCount,
    });
  };

  const handleSave = async () => {
    const isSaved = await api.toggleSavePost(post.id);
    onPostUpdated({
      ...post,
      isSaved,
    });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmittingComment) return;
    setIsSubmittingComment(true);
    try {
      const newComment = await api.addComment(post.id, commentText.trim());
      onPostUpdated({
        ...post,
        commentsCount: post.commentsCount + 1,
        comments: [...(post.comments || []), newComment],
      });
      setCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await api.deleteComment(post.id, commentId);
    onPostUpdated({
      ...post,
      commentsCount: Math.max(0, post.commentsCount - 1),
      comments: post.comments.filter((c) => c.id !== commentId),
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2 z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="bg-black light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]">
        {/* Left: Image / Video */}
        <div className="md:w-3/5 bg-black flex items-center justify-center relative overflow-hidden select-none">
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className={`w-full max-h-[85vh] object-contain ${post.filter || 'filter-normal'}`}
          />
        </div>

        {/* Right: Comments and Actions */}
        <div className="md:w-2/5 flex flex-col bg-neutral-950 dark:bg-black light:bg-white border-t md:border-t-0 md:border-l border-neutral-800 light:border-neutral-200 h-[85vh]">
          {/* Post Header */}
          <div className="p-4 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
            <div
              onClick={() => onSelectUser && onSelectUser(post.userId)}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <img
                src={post.userAvatar}
                alt={post.username}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-ig-primary transition"
              />
              <div>
                <span className="font-semibold text-sm hover:underline flex items-center gap-1">
                  {post.username}
                  {post.isVerified && <span className="text-ig-primary text-xs">●</span>}
                </span>
                {post.location && (
                  <p className="text-xs text-neutral-400">{post.location}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              title="Copy post link"
              className="text-neutral-400 hover:text-white light:hover:text-black p-1 text-xs"
            >
              {copiedLink ? 'Copied!' : <MoreHorizontal className="w-5 h-5" />}
            </button>
          </div>

          {/* Comments list + Caption */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption as first comment */}
            {post.caption && (
              <div className="flex items-start space-x-3 text-sm">
                <img
                  src={post.userAvatar}
                  alt={post.username}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold mr-2">{post.username}</span>
                    <span className="text-neutral-200 light:text-neutral-800 whitespace-pre-line leading-relaxed">
                      {post.caption}
                    </span>
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1">{post.createdAt}</p>
                </div>
              </div>
            )}

            {/* Comments thread */}
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((c: Comment) => (
                <div key={c.id} className="flex items-start space-x-3 text-sm group">
                  <img
                    src={c.userAvatar}
                    alt={c.username}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold mr-2">{c.username}</span>
                        <span className="text-neutral-300 light:text-neutral-700">{c.text}</span>
                      </p>
                      {user && (user.id === c.userId || user.username === c.username) && (
                        <button
                          onClick={() => handleDeleteComment(c.id)}
                          className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-500 p-1 transition"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-[11px] text-neutral-500 mt-1">
                      <span>{c.createdAt}</span>
                      {c.likesCount > 0 && <span>{c.likesCount} likes</span>}
                      <button className="font-semibold hover:text-neutral-300">Reply</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-neutral-500 text-sm">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Action buttons & likes */}
          <div className="p-4 border-t border-neutral-800 light:border-neutral-200 bg-neutral-900/40 light:bg-neutral-50/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className="hover:opacity-70 transition active:scale-125"
                >
                  <Heart
                    className={`w-6 h-6 transition duration-200 ${
                      post.isLiked ? 'text-ig-like fill-ig-like' : 'text-neutral-200 light:text-neutral-800'
                    }`}
                  />
                </button>
                <button
                  onClick={() => document.getElementById('modal-comment-input')?.focus()}
                  className="hover:opacity-70 transition"
                >
                  <MessageCircle className="w-6 h-6 text-neutral-200 light:text-neutral-800" />
                </button>
                <button onClick={handleCopyLink} className="hover:opacity-70 transition">
                  <Send className="w-6 h-6 text-neutral-200 light:text-neutral-800" />
                </button>
              </div>

              <button onClick={handleSave} className="hover:opacity-70 transition">
                <Bookmark
                  className={`w-6 h-6 ${
                    post.isSaved ? 'text-white light:text-black fill-current' : 'text-neutral-200 light:text-neutral-800'
                  }`}
                />
              </button>
            </div>

            {/* Likes count */}
            <p className="font-semibold text-xs sm:text-sm mb-1">
              {post.likesCount.toLocaleString()} likes
            </p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">
              {post.createdAt}
            </p>
          </div>

          {/* Comment Form */}
          <form
            onSubmit={handleAddComment}
            className="p-3 border-t border-neutral-800 light:border-neutral-200 flex items-center space-x-2"
          >
            <div className="flex items-center gap-1 text-neutral-400">
              <button
                type="button"
                onClick={() => setCommentText((prev) => prev + ' ❤️')}
                className="hover:scale-125 transition text-base"
              >
                ❤️
              </button>
              <button
                type="button"
                onClick={() => setCommentText((prev) => prev + ' 🔥')}
                className="hover:scale-125 transition text-base"
              >
                🔥
              </button>
              <button
                type="button"
                onClick={() => setCommentText((prev) => prev + ' 🙌')}
                className="hover:scale-125 transition text-base"
              >
                🙌
              </button>
            </div>

            <input
              id="modal-comment-input"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-xs sm:text-sm outline-none placeholder-neutral-500"
            />

            <button
              type="submit"
              disabled={!commentText.trim() || isSubmittingComment}
              className="font-semibold text-xs sm:text-sm text-ig-primary hover:text-ig-primaryHover disabled:opacity-30 transition"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
