export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  website?: string;
  isVerified?: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
  savedPostIds?: string[];
  likedPostIds?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  isVerified?: boolean;
  location?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  filter?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  caption: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  comments: Comment[];
  tags?: string[];
}

export interface StoryItem {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration: number; // in seconds
  caption?: string;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  isSeen?: boolean;
  items: StoryItem[];
}

export interface Highlight {
  id: string;
  title: string;
  coverUrl: string;
  items: StoryItem[];
}

export interface Reel {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  isVerified?: boolean;
  videoUrl: string;
  audioName: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isFollowing?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  mediaUrl?: string;
  createdAt: string;
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
    isOnline?: boolean;
    lastActive?: string;
  };
  lastMessage: Message;
  messages: Message[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  postId?: string;
  postMediaUrl?: string;
  commentText?: string;
  createdAt: string;
  isRead: boolean;
  isFollowing?: boolean;
}

export type TabType = 'home' | 'search' | 'explore' | 'reels' | 'messages' | 'notifications' | 'create' | 'profile';
