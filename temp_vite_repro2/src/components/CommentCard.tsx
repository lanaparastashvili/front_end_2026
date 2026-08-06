import React, { useState } from 'react';
import type { Comment } from '../types/comment';
import { currentUser } from '../data/comments';

interface VoteButtonProps {
  votes: number;
  onVote: (direction: 1 | -1) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ votes, onVote }) => {
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0);

  const handleVote = (dir: 1 | -1) => {
    if (userVote === dir) {
      setUserVote(0);
      onVote((-dir) as 1 | -1);
    } else {
      const diff = dir - userVote;
      setUserVote(dir);
      onVote(diff as 1 | -1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 bg-slate-100 rounded-xl px-3 py-2 select-none min-w-[2.5rem]">
      <button
        onClick={() => handleVote(1)}
        className={`text-lg font-bold leading-none transition-colors cursor-pointer ${
          userVote === 1 ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'
        }`}
        aria-label="Upvote"
      >
        +
      </button>
      <span className="text-indigo-600 font-semibold text-sm">{votes}</span>
      <button
        onClick={() => handleVote(-1)}
        className={`text-lg font-bold leading-none transition-colors cursor-pointer ${
          userVote === -1 ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'
        }`}
        aria-label="Downvote"
      >
        −
      </button>
    </div>
  );
};

interface CommentCardProps {
  comment: Comment;
  onReply: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onVote: (id: string, diff: 1 | -1) => void;
  depth?: number;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onReply,
  onDelete,
  onEdit,
  onVote,
  depth = 0,
}) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditSave = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText.trim());
    }
    setEditing(false);
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Delete comment</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete this comment? This will remove the comment and can't be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
              >
                NO, CANCEL
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  onDelete(comment.id);
                }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 ${
          depth > 0 ? 'ml-6 border-l-4 border-l-indigo-100' : ''
        }`}
      >
        {/* Vote Column */}
        <div className="flex-shrink-0">
          <VoteButton votes={comment.votes} onVote={(diff) => onVote(comment.id, diff)} />
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-8 h-8 rounded-full object-cover bg-indigo-100"
            />
            <span className="font-semibold text-slate-800 text-sm">{comment.author}</span>
            {comment.isOwn && (
              <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                you
              </span>
            )}
            <span className="text-slate-400 text-sm">{comment.timestamp}</span>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-3">
              {comment.isOwn ? (
                <>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-600 text-sm font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700 text-sm font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onReply(comment.id)}
                  className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700 text-sm font-semibold transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reply
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          {editing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={3}
                className="w-full border border-indigo-300 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleEditSave}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  UPDATE
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-600 text-sm leading-relaxed">
              {comment.replyingTo && (
                <span className="text-indigo-600 font-semibold mr-1">@{comment.replyingTo}</span>
              )}
              {comment.content}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

interface ReplyBoxProps {
  replyingTo: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export const ReplyBox: React.FC<ReplyBoxProps> = ({ replyingTo, onSubmit, onCancel }) => {
  const [text, setText] = useState(`@${replyingTo} `);

  return (
    <div className="ml-6 flex gap-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 border-l-4 border-l-indigo-300">
      <img
        src={currentUser.avatar}
        alt={currentUser.author}
        className="w-8 h-8 rounded-full object-cover bg-indigo-100 flex-shrink-0 mt-1"
      />
      <div className="flex-1">
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={`Reply to @${replyingTo}...`}
          className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-2"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              const content = text.replace(`@${replyingTo}`, '').trim();
              if (content) onSubmit(text.trim());
            }}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            REPLY
          </button>
        </div>
      </div>
    </div>
  );
};
