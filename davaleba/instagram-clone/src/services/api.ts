import { User, Post, Story, Reel, Conversation, Notification, Comment } from '../types';
import {
  CURRENT_USER,
  INITIAL_USERS,
  INITIAL_STORIES,
  INITIAL_POSTS,
  INITIAL_REELS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
} from './mockData';

// LocalStorage Keys
const KEYS = {
  CURRENT_USER: 'ig_current_user',
  USERS: 'ig_users',
  POSTS: 'ig_posts',
  STORIES: 'ig_stories',
  REELS: 'ig_reels',
  CONVERSATIONS: 'ig_conversations',
  NOTIFICATIONS: 'ig_notifications',
  AUTH_TOKEN: 'ig_auth_token',
};

// Helper to simulate network latency
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for local storage getters and setters
function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Storage error', err);
  }
}

export const api = {
  // --- AUTH & USER ---
  async login(usernameOrEmail: string, _password?: string): Promise<{ user: User; token: string }> {
    await delay(300);
    const users = getFromStorage<User[]>(KEYS.USERS, INITIAL_USERS);
    const currentUser = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);

    // If user typed custom username, find or create
    let found = users.find(
      (u) => u.username.toLowerCase() === usernameOrEmail.toLowerCase()
    );
    if (!found && (usernameOrEmail.toLowerCase() === currentUser.username.toLowerCase() || usernameOrEmail.includes('alex'))) {
      found = currentUser;
    }

    if (!found) {
      // Create user on login if arbitrary
      found = {
        ...currentUser,
        id: `user_${Date.now()}`,
        username: usernameOrEmail.split('@')[0].toLowerCase().replace(/\s+/g, '.'),
        fullName: usernameOrEmail.split('@')[0],
      };
    }

    saveToStorage(KEYS.CURRENT_USER, found);
    saveToStorage(KEYS.AUTH_TOKEN, `token_${found.id}_${Date.now()}`);
    return { user: found, token: `token_${found.id}` };
  },

  async register(data: { emailOrPhone: string; fullName: string; username: string; password?: string }): Promise<{ user: User; token: string }> {
    await delay(400);
    const users = getFromStorage<User[]>(KEYS.USERS, INITIAL_USERS);
    const newUser: User = {
      id: `user_${Date.now()}`,
      username: data.username.toLowerCase().trim().replace(/\s+/g, '.'),
      fullName: data.fullName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      bio: `👋 Hey! I am ${data.fullName}. Welcome to my Instagram!`,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      savedPostIds: [],
      likedPostIds: [],
      isVerified: false,
    };

    const updatedUsers = [newUser, ...users];
    saveToStorage(KEYS.USERS, updatedUsers);
    saveToStorage(KEYS.CURRENT_USER, newUser);
    saveToStorage(KEYS.AUTH_TOKEN, `token_${newUser.id}_${Date.now()}`);

    return { user: newUser, token: `token_${newUser.id}` };
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(KEYS.AUTH_TOKEN);
    if (!token) return null;
    return getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    await delay(200);
    const current = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
    const updated = { ...current, ...updates };
    saveToStorage(KEYS.CURRENT_USER, updated);

    // also update in posts if username or avatar changed
    if (updates.username || updates.avatar) {
      const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);
      const updatedPosts = posts.map((p) =>
        p.userId === updated.id
          ? {
              ...p,
              username: updated.username || p.username,
              userAvatar: updated.avatar || p.userAvatar,
            }
          : p
      );
      saveToStorage(KEYS.POSTS, updatedPosts);
    }
    return updated;
  },

  async logout(): Promise<void> {
    await delay(150);
    localStorage.removeItem(KEYS.AUTH_TOKEN);
  },

  // --- POSTS ---
  async getFeedPosts(): Promise<Post[]> {
    await delay(200);
    return getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);
  },

  async getExplorePosts(): Promise<Post[]> {
    await delay(200);
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);
    // Add extra explore-specific photo variations
    const extraExplore: Post[] = [
      {
        id: 'exp_1',
        userId: 'user_1',
        username: 'elena_nature',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        caption: 'Misty pine valleys at dusk 🌲✨ #wilderness',
        likesCount: 6812,
        commentsCount: 94,
        createdAt: '3 DAYS AGO',
        comments: [],
      },
      {
        id: 'exp_2',
        userId: 'user_2',
        username: 'marco.streets',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        caption: 'Geometric shadows in Shinjuku alleys ⛩️',
        likesCount: 4210,
        commentsCount: 52,
        createdAt: '4 DAYS AGO',
        comments: [],
      },
      {
        id: 'exp_3',
        userId: 'user_3',
        username: 'sophia.aesthetic',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        caption: 'Minimalist desktop workstation setup 💻☕',
        likesCount: 8900,
        commentsCount: 120,
        createdAt: '5 DAYS AGO',
        comments: [],
      },
      {
        id: 'exp_4',
        userId: 'user_4',
        username: 'david_cinema',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        caption: 'Cinematic lights and rainy roads 🚗🌧️',
        likesCount: 3120,
        commentsCount: 67,
        createdAt: '6 DAYS AGO',
        comments: [],
      },
      {
        id: 'exp_5',
        userId: 'user_5',
        username: 'nina_culinary',
        userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        caption: 'Artisan bakery loaves freshly scored 🍞✨',
        likesCount: 1540,
        commentsCount: 29,
        createdAt: '1 WEEK AGO',
        comments: [],
      },
      {
        id: 'exp_6',
        userId: 'user_1',
        username: 'elena_nature',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        caption: 'Sun rays filtering through the redwood canopy 🌲☀️',
        likesCount: 9420,
        commentsCount: 138,
        createdAt: '1 WEEK AGO',
        comments: [],
      }
    ];
    return [...posts, ...extraExplore];
  },

  async createPost(data: {
    mediaUrl: string;
    caption: string;
    location?: string;
    filter?: string;
    aspectRatio?: 'square' | 'portrait' | 'landscape';
  }): Promise<Post> {
    await delay(300);
    const currentUser = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);

    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      isVerified: currentUser.isVerified,
      location: data.location,
      mediaUrl: data.mediaUrl,
      mediaType: 'image',
      filter: data.filter || 'filter-normal',
      aspectRatio: data.aspectRatio || 'square',
      caption: data.caption,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: 'JUST NOW',
      comments: [],
    };

    const updatedPosts = [newPost, ...posts];
    saveToStorage(KEYS.POSTS, updatedPosts);

    // Update user posts count
    currentUser.postsCount = (currentUser.postsCount || 0) + 1;
    saveToStorage(KEYS.CURRENT_USER, currentUser);

    return newPost;
  },

  async toggleLikePost(postId: string): Promise<{ isLiked: boolean; likesCount: number }> {
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);
    let result = { isLiked: false, likesCount: 0 };

    const updated = posts.map((post) => {
      if (post.id === postId) {
        const nextLiked = !post.isLiked;
        const nextLikesCount = nextLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);
        result = { isLiked: nextLiked, likesCount: nextLikesCount };
        return {
          ...post,
          isLiked: nextLiked,
          likesCount: nextLikesCount,
        };
      }
      return post;
    });

    saveToStorage(KEYS.POSTS, updated);
    return result;
  },

  async toggleSavePost(postId: string): Promise<boolean> {
    const currentUser = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);
    const savedIds = new Set(currentUser.savedPostIds || []);

    let isSaved = false;
    if (savedIds.has(postId)) {
      savedIds.delete(postId);
      isSaved = false;
    } else {
      savedIds.add(postId);
      isSaved = true;
    }

    currentUser.savedPostIds = Array.from(savedIds);
    saveToStorage(KEYS.CURRENT_USER, currentUser);

    const updatedPosts = posts.map((p) => (p.id === postId ? { ...p, isSaved } : p));
    saveToStorage(KEYS.POSTS, updatedPosts);

    return isSaved;
  },

  async addComment(postId: string, text: string): Promise<Comment> {
    await delay(150);
    const currentUser = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text,
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...(post.comments || []), newComment],
        };
      }
      return post;
    });

    saveToStorage(KEYS.POSTS, updatedPosts);
    return newComment;
  },

  async deleteComment(postId: string, commentId: string): Promise<void> {
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: Math.max(0, post.commentsCount - 1),
          comments: post.comments.filter((c) => c.id !== commentId),
        };
      }
      return post;
    });
    saveToStorage(KEYS.POSTS, updatedPosts);
  },

  // --- STORIES ---
  async getStories(): Promise<Story[]> {
    await delay(150);
    return getFromStorage<Story[]>(KEYS.STORIES, INITIAL_STORIES);
  },

  async markStorySeen(storyId: string): Promise<void> {
    const stories = getFromStorage<Story[]>(KEYS.STORIES, INITIAL_STORIES);
    const updated = stories.map((s) => (s.id === storyId ? { ...s, isSeen: true } : s));
    saveToStorage(KEYS.STORIES, updated);
  },

  // --- REELS ---
  async getReels(): Promise<Reel[]> {
    await delay(200);
    return getFromStorage<Reel[]>(KEYS.REELS, INITIAL_REELS);
  },

  async toggleLikeReel(reelId: string): Promise<{ isLiked: boolean; likesCount: number }> {
    const reels = getFromStorage<Reel[]>(KEYS.REELS, INITIAL_REELS);
    let result = { isLiked: false, likesCount: 0 };

    const updated = reels.map((reel) => {
      if (reel.id === reelId) {
        const nextLiked = !reel.isLiked;
        const nextLikesCount = nextLiked ? reel.likesCount + 1 : Math.max(0, reel.likesCount - 1);
        result = { isLiked: nextLiked, likesCount: nextLikesCount };
        return {
          ...reel,
          isLiked: nextLiked,
          likesCount: nextLikesCount,
        };
      }
      return reel;
    });

    saveToStorage(KEYS.REELS, updated);
    return result;
  },

  // --- DIRECT MESSAGES ---
  async getConversations(): Promise<Conversation[]> {
    await delay(150);
    return getFromStorage<Conversation[]>(KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  },

  async sendMessage(conversationId: string, text: string): Promise<Conversation> {
    await delay(100);
    const currentUser = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
    const convs = getFromStorage<Conversation[]>(KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      createdAt: 'Just now',
      isRead: true,
    };

    let updatedConv: Conversation | null = null;
    const updatedConvs = convs.map((c) => {
      if (c.id === conversationId) {
        updatedConv = {
          ...c,
          lastMessage: newMessage,
          messages: [...c.messages, newMessage],
        };
        return updatedConv;
      }
      return c;
    });

    saveToStorage(KEYS.CONVERSATIONS, updatedConvs);
    return updatedConv!;
  },

  // --- NOTIFICATIONS ---
  async getNotifications(): Promise<Notification[]> {
    await delay(150);
    return getFromStorage<Notification[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  async markNotificationsRead(): Promise<void> {
    const notifs = getFromStorage<Notification[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const updated = notifs.map((n) => ({ ...n, isRead: true }));
    saveToStorage(KEYS.NOTIFICATIONS, updated);
  },

  // --- USERS & SEARCH ---
  async getSuggestions(): Promise<User[]> {
    await delay(150);
    return getFromStorage<User[]>(KEYS.USERS, INITIAL_USERS);
  },

  async toggleFollowUser(userId: string): Promise<boolean> {
    const users = getFromStorage<User[]>(KEYS.USERS, INITIAL_USERS);
    let nextFollowing = false;

    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        nextFollowing = !u.isFollowing;
        return {
          ...u,
          isFollowing: nextFollowing,
          followersCount: nextFollowing ? u.followersCount + 1 : Math.max(0, u.followersCount - 1),
        };
      }
      return u;
    });

    const currentUser = getFromStorage<User>(KEYS.CURRENT_USER, CURRENT_USER);
    currentUser.followingCount = nextFollowing
      ? (currentUser.followingCount || 0) + 1
      : Math.max(0, (currentUser.followingCount || 0) - 1);

    saveToStorage(KEYS.CURRENT_USER, currentUser);
    saveToStorage(KEYS.USERS, updatedUsers);

    return nextFollowing;
  },

  async search(query: string): Promise<{ users: User[]; posts: Post[] }> {
    await delay(100);
    const q = query.toLowerCase().trim();
    if (!q) return { users: [], posts: [] };

    const users = getFromStorage<User[]>(KEYS.USERS, INITIAL_USERS);
    const posts = getFromStorage<Post[]>(KEYS.POSTS, INITIAL_POSTS);

    const matchedUsers = users.filter(
      (u) => u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q)
    );

    const matchedPosts = posts.filter(
      (p) =>
        p.caption.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );

    return { users: matchedUsers, posts: matchedPosts };
  },
};
