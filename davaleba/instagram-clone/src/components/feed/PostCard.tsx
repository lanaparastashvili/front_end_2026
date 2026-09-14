import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Smile,
  Trash2,
} from 'lucide-react';
import { Post, Comment } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface PostCardProps {
  post: Post;
  onPostUpdated: (updated: Post) => void;
  onOpenDetail: (post: Post) => void;
  onSelectUser: (userId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostUpdated,
  onOpenDetail,
  onSelectUser,
}) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleLike = async () => {
    const res = await api.toggleLikePost(post.id);
    onPostUpdated({
      ...post,
      isLiked: res.isLiked,
      likesCount: res.likesCount,
    });
  };

  const handleDoubleTap = async () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Trigger heart pop
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
      if (!post.isLiked) {
        const res = await api.toggleLikePost(post.id);
        onPostUpdated({
          ...post,
          isLiked: res.isLiked,
          likesCount: res.likesCount,
        });
      }
    }
    lastTapRef.current = now;
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
    if (!commentText.trim()) return;
    const newComment = await api.addComment(post.id, commentText.trim());
    onPostUpdated({
      ...post,
      commentsCount: post.commentsCount + 1,
      comments: [...(post.comments || []), newComment],
    });
    setCommentText('');
  };

  const handleDeleteComment = async (commentId: string) => {
    await api.deleteComment(post.id, commentId);
    onPostUpdated({
      ...post,
      commentsCount: Math.max(0, post.commentsCount - 1),
      comments: post.comments.filter((c) => c.id !== commentId),
    });
  };

  return (
    <article className="bg-black light:bg-white border border-neutral-800 light:border-neutral-200 rounded-xl mb-6 overflow-hidden transition">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3.5">
        <div
          onClick={() => onSelectUser(post.userId)}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full p-[1.5px] story-gradient flex items-center justify-center">
            <img
              src={post.userAvatar}
              alt={post.username}
              className="w-full h-full rounded-full object-cover border-2 border-black light:border-white"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-xs sm:text-sm hover:underline">
                {post.username}
              </span>
              {post.isVerified && (
                <span className="text-ig-primary text-xs font-bold" title="Verified">
                  ●
                </span>
              )}
            </div>
            {post.location && (
              <p className="text-[11px] text-neutral-400 leading-none mt-0.5">
                {post.location}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowMenu(true)}
          className="text-neutral-400 hover:text-white light:hover:text-black p-1 transition"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Media with Double-Tap heart animation */}
      <div
        className="relative bg-neutral-950 overflow-hidden cursor-pointer select-none aspect-square sm:aspect-auto max-h-[580px] flex items-center justify-center"
        onClick={handleDoubleTap}
      >
        <img
          src={post.mediaUrl}
          alt={post.caption}
          className={`w-full h-auto max-h-[580px] object-cover transition duration-300 ${post.filter || 'filter-normal'}`}
        />

        {/* Double-tap animated heart pop */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl animate-like-heart" />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-3.5 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="hover:opacity-70 transition active:scale-125"
            >
              <Heart
                className={`w-6 h-6 transition duration-200 ${
                  post.isLiked
                    ? 'text-ig-like fill-ig-like'
                    : 'text-neutral-100 light:text-neutral-800'
                }`}
              />
            </button>
            <button
              onClick={() => onOpenDetail(post)}
              className="hover:opacity-70 transition"
            >
              <MessageCircle className="w-6 h-6 text-neutral-100 light:text-neutral-800" />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Post link copied to clipboard!');
              }}
              className="hover:opacity-70 transition"
            >
              <Send className="w-6 h-6 text-neutral-100 light:text-neutral-800" />
            </button>
          </div>

          <button onClick={handleSave} className="hover:opacity-70 transition">
            <Bookmark
              className={`w-6 h-6 ${
                post.isSaved
                  ? 'text-white light:text-black fill-current'
                  : 'text-neutral-100 light:text-neutral-800'
              }`}
            />
          </button>
        </div>

        {/* Likes Count */}
        <p className="font-semibold text-xs sm:text-sm mb-1 text-neutral-100 light:text-neutral-900">
          {post.likesCount.toLocaleString()} likes
        </p>

        {/* Caption */}
        {post.caption && (
          <div className="text-xs sm:text-sm text-neutral-200 light:text-neutral-800 mb-1.5 leading-relaxed">
            <span
              onClick={() => onSelectUser(post.userId)}
              className="font-semibold mr-1.5 cursor-pointer hover:underline text-white light:text-black"
            >
              {post.username}
            </span>
            <span>
              {isExpanded
                ? post.caption
                : post.caption.slice(0, 110) + (post.caption.length > 110 ? '...' : '')}
            </span>
            {post.caption.length > 110 && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-neutral-500 hover:text-neutral-300 ml-1 text-xs font-medium"
              >
                more
              </button>
            )}
          </div>
        )}

        {/* View all comments link */}
        {post.commentsCount > 0 && (
          <button
            onClick={() => onOpenDetail(post)}
            className="text-xs text-neutral-500 hover:text-neutral-300 font-medium block my-1"
          >
            View all {post.commentsCount} comments
          </button>
        )}

        {/* Latest 2 Comments Preview */}
        {post.comments && post.comments.length > 0 && (
          <div className="space-y-1 my-1">
            {post.comments.slice(-2).map((c: Comment) => (
              <div
                key={c.id}
                className="flex items-center justify-between text-xs sm:text-sm group"
              >
                <div className="truncate">
                  <span className="font-semibold mr-1.5">{c.username}</span>
                  <span className="text-neutral-300 light:text-neutral-700">{c.text}</span>
                </div>
                {user && (user.id === c.userId || user.username === c.username) && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-500 p-0.5 ml-2 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Time Ago */}
        <p className="text-[10px] text-neutral-500 uppercase tracking-wide mt-1.5">
          {post.createdAt}
        </p>
      </div>

      {/* Add Comment Bar */}
      <form
        onSubmit={handleAddComment}
        className="px-3.5 py-2.5 border-t border-neutral-800/80 light:border-neutral-200/80 flex items-center space-x-2"
      >
        <div className="flex items-center gap-1 text-neutral-400">
          {['❤️', '🙌', '🔥'].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setCommentText((prev) => prev + emoji)}
              className="hover:scale-125 transition text-sm"
            >
              {emoji}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-xs sm:text-sm outline-none placeholder-neutral-500 text-neutral-100 light:text-neutral-900"
        />

        {commentText.trim() && (
          <button
            type="submit"
            className="font-semibold text-xs sm:text-sm text-ig-primary hover:text-ig-primaryHover transition"
          >
            Post
          </button>
        )}
      </form>

      {/* 3-Dots Action Modal */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl divide-y divide-neutral-800 light:divide-neutral-200 text-center text-sm font-medium">
            <button
              onClick={() => {
                handleSave();
                setShowMenu(false);
              }}
              className="w-full py-3.5 hover:bg-neutral-800 light:hover:bg-neutral-100"
            >
              {post.isSaved ? 'Remove from saved' : 'Save post'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                setShowMenu(false);
                alert('Link copied to clipboard!');
              }}
              className="w-full py-3.5 hover:bg-neutral-800 light:hover:bg-neutral-100"
            >
              Copy link
            </button>
            <button
              onClick={() => {
                onOpenDetail(post);
                setShowMenu(false);
              }}
              className="w-full py-3.5 hover:bg-neutral-800 light:hover:bg-neutral-100"
            >
              Go to post
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full py-3.5 text-neutral-400 hover:bg-neutral-800 light:hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
