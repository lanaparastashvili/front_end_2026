import React, { useState, useEffect } from 'react';
import { TabType, Post, User } from './types';
import { useAuth, AuthProvider } from './context/AuthContext';
import { useTheme, ThemeProvider } from './context/ThemeContext';
import { api } from './services/api';

// Layout
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ReelsPage } from './pages/ReelsPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';

// Modals
import { CreatePostModal } from './components/feed/CreatePostModal';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { EditProfileModal } from './components/modals/EditProfileModal';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [posts, setPosts] = useState<Post[]>([]);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [viewUserProfile, setViewUserProfile] = useState<User | null>(null);

  // Load feed posts
  useEffect(() => {
    if (isAuthenticated) {
      api.getFeedPosts().then((res) => setPosts(res));
    }
  }, [isAuthenticated]);

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    if (selectedPost && selectedPost.id === updatedPost.id) {
      setSelectedPost(updatedPost);
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    setActiveTab('home');
  };

  const handleSelectUser = async (userOrId: User | string) => {
    if (typeof userOrId === 'string') {
      const suggestions = await api.getSuggestions();
      const found = suggestions.find((u) => u.id === userOrId);
      if (found) {
        setViewUserProfile(found);
        setActiveTab('profile');
      }
    } else {
      setViewUserProfile(userOrId);
      setActiveTab('profile');
    }
  };

  // If loading auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl p-1 story-gradient animate-pulse flex items-center justify-center">
          <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold font-logo text-white">IG</span>
          </div>
        </div>
        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">
          Instagram
        </p>
      </div>
    );
  }

  // If unauthenticated, show Auth (Login / Register)
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-black light:bg-neutral-50 text-neutral-100 light:text-neutral-900 flex flex-col md:flex-row font-sans">
      {/* Desktop Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'profile') setViewUserProfile(null); // Own profile
          setActiveTab(tab);
        }}
        onOpenCreate={() => setIsCreateOpen(true)}
        onSelectUser={handleSelectUser}
        onSelectPost={(post) => setSelectedPost(post)}
      />

      {/* Mobile Top Header */}
      <MobileHeader
        onTabChange={(tab) => {
          if (tab === 'profile') setViewUserProfile(null);
          setActiveTab(tab);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[72px] lg:ml-[244px] min-h-screen overflow-x-hidden">
        {activeTab === 'home' && (
          <HomePage
            posts={posts}
            onPostUpdated={handlePostUpdated}
            onOpenDetail={(post) => setSelectedPost(post)}
            onSelectUser={handleSelectUser}
            onOpenEditProfile={() => setIsEditProfileOpen(true)}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            onOpenDetail={(post) => setSelectedPost(post)}
            onSelectUser={handleSelectUser}
          />
        )}

        {activeTab === 'reels' && <ReelsPage />}

        {activeTab === 'messages' && <MessagesPage />}

        {activeTab === 'profile' && (
          <ProfilePage
            viewUser={viewUserProfile}
            posts={posts}
            onOpenDetail={(post) => setSelectedPost(post)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'profile') setViewUserProfile(null);
          setActiveTab(tab);
        }}
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {/* Global Modals */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <PostDetailModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onPostUpdated={handlePostUpdated}
        onSelectUser={(userId) => {
          setSelectedPost(null);
          handleSelectUser(userId);
        }}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
