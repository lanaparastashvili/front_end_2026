import React, { useState, useEffect } from 'react';
import {
  Grid,
  Bookmark,
  UserCheck,
  Settings,
  Heart,
  MessageCircle,
  Film,
  Tag,
  Plus,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { User, Post, Highlight } from '../types';
import { useAuth } from '../context/AuthContext';
import { INITIAL_HIGHLIGHTS } from '../services/mockData';
import { api } from '../services/api';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { FollowListModal } from '../components/modals/FollowListModal';

interface ProfilePageProps {
  viewUser?: User | null;
  posts: Post[];
  onOpenDetail: (post: Post) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  viewUser,
  posts,
  onOpenDetail,
}) => {
  const { user: currentUser } = useAuth();
  const user = viewUser || currentUser;

  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'tagged'>('posts');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [followModalType, setFollowModalType] = useState<'followers' | 'following' | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>(INITIAL_HIGHLIGHTS);
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const [followersCount, setFollowersCount] = useState(user?.followersCount || 0);

  const isOwnProfile = !viewUser || (currentUser && viewUser.id === currentUser.id);

  // Filter posts
  const userPosts = posts.filter((p) => (user ? p.userId === user.id : true));
  const savedPosts = posts.filter((p) => p.isSaved);

  const handleToggleFollow = async () => {
    if (!user) return;
    const nextFollowing = await api.toggleFollowUser(user.id);
    setIsFollowing(nextFollowing);
    setFollowersCount((prev) => (nextFollowing ? prev + 1 : Math.max(0, prev - 1)));
  };

  if (!user) {
    return <div className="p-8 text-center text-neutral-500">Loading profile...</div>;
  }

  return (
    <div className="w-full max-w-[935px] mx-auto pt-4 md:pt-8 pb-20 px-4">
      {/* Profile Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-14 mb-8">
        {/* Profile Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1 story-gradient flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-full p-1">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex-1 space-y-4 text-center sm:text-left">
          {/* Row 1: Username & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-1.5">
              {user.username}
              {user.isVerified && (
                <span className="text-ig-primary text-sm font-bold" title="Verified Account">
                  ●
                </span>
              )}
            </h1>

            {isOwnProfile ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="px-4 py-1.5 bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 text-xs sm:text-sm font-semibold rounded-lg transition"
                >
                  Edit profile
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Profile link copied!');
                  }}
                  className="px-4 py-1.5 bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFollow}
                  className={`px-6 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition ${
                    isFollowing
                      ? 'bg-neutral-800 light:bg-neutral-200 text-neutral-200 light:text-neutral-800'
                      : 'bg-ig-primary text-white hover:bg-ig-primaryHover'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-4 py-1.5 bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 text-xs sm:text-sm font-semibold rounded-lg transition">
                  Message
                </button>
              </div>
            )}
          </div>

          {/* Row 2: Stats (Desktop & Tablet) */}
          <div className="flex items-center justify-center sm:justify-start space-x-8 text-sm">
            <div>
              <span className="font-bold text-white light:text-black">
                {userPosts.length}
              </span>{' '}
              <span className="text-neutral-400">posts</span>
            </div>
            <button
              onClick={() => setFollowModalType('followers')}
              className="hover:opacity-80 transition"
            >
              <span className="font-bold text-white light:text-black">
                {followersCount.toLocaleString()}
              </span>{' '}
              <span className="text-neutral-400">followers</span>
            </button>
            <button
              onClick={() => setFollowModalType('following')}
              className="hover:opacity-80 transition"
            >
              <span className="font-bold text-white light:text-black">
                {(user.followingCount || 0).toLocaleString()}
              </span>{' '}
              <span className="text-neutral-400">following</span>
            </button>
          </div>

          {/* Row 3: Bio & Name */}
          <div className="space-y-1 text-xs sm:text-sm">
            <h2 className="font-bold">{user.fullName}</h2>
            {user.bio && (
              <p className="text-neutral-200 light:text-neutral-800 whitespace-pre-line leading-relaxed">
                {user.bio}
              </p>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="text-ig-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                {user.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Story Highlights */}
      <div className="flex items-center space-x-6 mb-8 overflow-x-auto no-scrollbar pb-2">
        {highlights.map((hl) => (
          <div key={hl.id} className="flex flex-col items-center space-y-1.5 flex-shrink-0 cursor-pointer group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-neutral-700 p-1 flex items-center justify-center group-hover:scale-105 transition">
              <img
                src={hl.coverUrl}
                alt={hl.title}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-neutral-300 light:text-neutral-700 truncate max-w-[80px]">
              {hl.title}
            </span>
          </div>
        ))}

        {isOwnProfile && (
          <div
            onClick={() => alert('Add highlight feature: Select stories from your archive!')}
            className="flex flex-col items-center space-y-1.5 flex-shrink-0 cursor-pointer group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-neutral-700 flex items-center justify-center group-hover:scale-105 transition text-neutral-400">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-neutral-400">New</span>
          </div>
        )}
      </div>

      {/* Profile Tabs */}
      <div className="border-t border-neutral-800 light:border-neutral-200">
        <div className="flex justify-center space-x-12 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-2 py-3 border-t-2 transition ${
              activeTab === 'posts'
                ? 'border-white light:border-black text-white light:text-black'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Posts</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`flex items-center space-x-2 py-3 border-t-2 transition ${
              activeTab === 'reels'
                ? 'border-white light:border-black text-white light:text-black'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Reels</span>
          </button>

          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center space-x-2 py-3 border-t-2 transition ${
                activeTab === 'saved'
                  ? 'border-white light:border-black text-white light:text-black'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('tagged')}
            className={`flex items-center space-x-2 py-3 border-t-2 transition ${
              activeTab === 'tagged'
                ? 'border-white light:border-black text-white light:text-black'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Tagged</span>
          </button>
        </div>

        {/* Tab Content Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-4 mt-2">
          {activeTab === 'posts' &&
            userPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenDetail(post)}
                className="relative group cursor-pointer aspect-square bg-neutral-900 rounded-sm sm:rounded-lg overflow-hidden"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${post.filter || 'filter-normal'}`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-6 text-white font-bold text-xs sm:text-base">
                  <div className="flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    <span>{post.likesCount}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === 'saved' &&
            savedPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenDetail(post)}
                className="relative group cursor-pointer aspect-square bg-neutral-900 rounded-sm sm:rounded-lg overflow-hidden"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${post.filter || 'filter-normal'}`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-6 text-white font-bold text-xs sm:text-base">
                  <div className="flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    <span>{post.likesCount}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === 'reels' && (
            <div className="col-span-3 py-16 text-center text-neutral-500 text-sm">
              <Film className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">Reels shared by {user.username} will appear here.</p>
            </div>
          )}

          {activeTab === 'tagged' && (
            <div className="col-span-3 py-16 text-center text-neutral-500 text-sm">
              <Tag className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">Photos and videos of {user.username} will appear here.</p>
            </div>
          )}

          {activeTab === 'posts' && userPosts.length === 0 && (
            <div className="col-span-3 py-16 text-center text-neutral-500 text-sm">
              <Grid className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">No posts yet</p>
            </div>
          )}

          {activeTab === 'saved' && savedPosts.length === 0 && (
            <div className="col-span-3 py-16 text-center text-neutral-500 text-sm">
              <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">Save photos and videos that you want to see again.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Followers / Following Modal */}
      {followModalType && (
        <FollowListModal
          isOpen={!!followModalType}
          type={followModalType}
          onClose={() => setFollowModalType(null)}
          onSelectUser={() => setFollowModalType(null)}
        />
      )}
    </div>
  );
};
