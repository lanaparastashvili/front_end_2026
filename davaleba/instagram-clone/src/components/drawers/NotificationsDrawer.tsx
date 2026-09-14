import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';
import { Notification } from '../../types';
import { api } from '../../services/api';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPost?: (postId: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectPost,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      api.getNotifications().then((res) => {
        setNotifications(res);
        api.markNotificationsRead();
      });
    }
  }, [isOpen]);

  const toggleFollow = async (userId: string) => {
    const isNowFollowing = await api.toggleFollowUser(userId);
    setFollowingMap((prev) => ({ ...prev, [userId]: isNowFollowing }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 md:left-[72px] lg:left-[244px] w-full sm:w-[397px] bg-neutral-950 dark:bg-black light:bg-white border-r border-neutral-800 light:border-neutral-200 z-40 flex flex-col shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-neutral-800 light:border-neutral-200 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-neutral-400 hover:text-white light:hover:text-black hover:bg-neutral-800 light:hover:bg-neutral-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <span className="text-sm font-semibold px-2 mb-2 block">Recent Activity</span>
          <div className="space-y-2">
            {notifications.map((n) => {
              const isFollowing = followingMap[n.userId] ?? n.isFollowing ?? false;
              return (
                <div
                  key={n.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition ${
                    !n.isRead ? 'bg-neutral-900/60 light:bg-neutral-100/70' : 'hover:bg-neutral-900/40 light:hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0 pr-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={n.userAvatar}
                        alt={n.username}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs">
                        {n.type === 'like' && <Heart className="w-3 h-3 text-red-500 fill-red-500" />}
                        {n.type === 'comment' && <MessageCircle className="w-3 h-3 text-sky-400 fill-sky-400" />}
                        {n.type === 'follow' && <UserPlus className="w-3 h-3 text-ig-primary" />}
                        {n.type === 'mention' && <AtSign className="w-3 h-3 text-purple-400" />}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="font-semibold cursor-pointer hover:underline">
                        {n.username}
                      </span>{' '}
                      <span className="text-neutral-300 light:text-neutral-700">
                        {n.type === 'like' && 'liked your post.'}
                        {n.type === 'comment' && `commented: "${n.commentText}"`}
                        {n.type === 'follow' && 'started following you.'}
                        {n.type === 'mention' && 'mentioned you in a post.'}
                      </span>
                      <span className="text-neutral-500 ml-1.5">{n.createdAt}</span>
                    </div>
                  </div>

                  {/* Right side: Follow button or post thumbnail */}
                  {n.type === 'follow' ? (
                    <button
                      onClick={() => toggleFollow(n.userId)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isFollowing
                          ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                          : 'bg-ig-primary text-white hover:bg-ig-primaryHover'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  ) : n.postMediaUrl ? (
                    <img
                      onClick={() => n.postId && onSelectPost && onSelectPost(n.postId)}
                      src={n.postMediaUrl}
                      alt="thumbnail"
                      className="w-10 h-10 rounded-md object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
