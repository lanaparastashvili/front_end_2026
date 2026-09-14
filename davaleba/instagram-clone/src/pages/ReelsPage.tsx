import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import { Reel } from '../types';
import { api } from '../services/api';

export const ReelsPage: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    api.getReels().then((res) => setReels(res));
  }, []);

  const currentReel = reels[currentIndex];

  const handleLike = async () => {
    if (!currentReel) return;
    const res = await api.toggleLikeReel(currentReel.id);
    setReels((prev) =>
      prev.map((r, i) =>
        i === currentIndex
          ? {
              ...r,
              isLiked: res.isLiked,
              likesCount: res.likesCount,
            }
          : r
      )
    );
  };

  const handleFollow = async () => {
    if (!currentReel) return;
    const isNowFollowing = await api.toggleFollowUser(currentReel.userId);
    setReels((prev) =>
      prev.map((r, i) =>
        i === currentIndex
          ? {
              ...r,
              isFollowing: isNowFollowing,
            }
          : r
      )
    );
  };

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!currentReel) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-neutral-500">
        Loading Reels...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[500px] mx-auto pt-2 sm:pt-4 pb-20 px-2 flex flex-col items-center justify-center">
      {/* Reel Box */}
      <div className="relative w-full max-w-[390px] h-[78vh] max-h-[700px] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex">
        {/* Media Container */}
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
          <img
            src={currentReel.videoUrl}
            alt="reel"
            className="w-full h-full object-cover"
          />

          {/* Sound toggle button */}
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 text-white backdrop-blur z-20 hover:bg-black/60 transition"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Left / Bottom info overlays */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 space-y-3">
            {/* Author + Follow button */}
            <div className="flex items-center space-x-3">
              <img
                src={currentReel.userAvatar}
                alt={currentReel.username}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50"
              />
              <span className="text-white text-sm font-semibold drop-shadow flex items-center gap-1">
                {currentReel.username}
                {currentReel.isVerified && <span className="text-ig-primary text-xs">●</span>}
              </span>
              <button
                onClick={handleFollow}
                className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur transition ${
                  currentReel.isFollowing
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-ig-primary text-white hover:bg-ig-primaryHover'
                }`}
              >
                {currentReel.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Caption */}
            <p className="text-white text-xs sm:text-sm line-clamp-2 leading-relaxed drop-shadow">
              {currentReel.caption}
            </p>

            {/* Audio Track marquee / ticker */}
            <div className="flex items-center space-x-2 text-white/90 text-xs">
              <Music className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="truncate">{currentReel.audioName}</span>
            </div>
          </div>
        </div>

        {/* Floating Right Action Bar */}
        <div className="absolute right-3 bottom-14 flex flex-col items-center space-y-4 z-30 text-white">
          {/* Like */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleLike}
              className="p-2 hover:scale-110 active:scale-90 transition"
            >
              <Heart
                className={`w-7 h-7 drop-shadow ${
                  currentReel.isLiked ? 'text-ig-like fill-ig-like animate-like-heart' : 'text-white'
                }`}
              />
            </button>
            <span className="text-xs font-medium drop-shadow">
              {currentReel.likesCount.toLocaleString()}
            </span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setCommentsOpen((prev) => !prev)}
              className="p-2 hover:scale-110 transition"
            >
              <MessageCircle className="w-7 h-7 drop-shadow" />
            </button>
            <span className="text-xs font-medium drop-shadow">
              {currentReel.commentsCount.toLocaleString()}
            </span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Reel link copied!');
              }}
              className="p-2 hover:scale-110 transition"
            >
              <Send className="w-7 h-7 drop-shadow" />
            </button>
            <span className="text-xs font-medium drop-shadow">
              {currentReel.sharesCount.toLocaleString()}
            </span>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => {
              setReels((prev) =>
                prev.map((r, i) => (i === currentIndex ? { ...r, isSaved: !r.isSaved } : r))
              );
            }}
            className="p-2 hover:scale-110 transition"
          >
            <Bookmark
              className={`w-7 h-7 drop-shadow ${
                currentReel.isSaved ? 'text-white fill-white' : 'text-white'
              }`}
            />
          </button>

          {/* Spinning Audio Album Cover */}
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden animate-spin-slow shadow-lg">
            <img src={currentReel.userAvatar} alt="audio" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Up/Down Reel Navigation Buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-neutral-900 light:bg-neutral-200 border border-neutral-800 light:border-neutral-300 text-neutral-300 light:text-neutral-700 hover:text-white disabled:opacity-30 transition"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <span className="text-xs text-neutral-500 font-medium">
          {currentIndex + 1} / {reels.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
          className="p-2 rounded-full bg-neutral-900 light:bg-neutral-200 border border-neutral-800 light:border-neutral-300 text-neutral-300 light:text-neutral-700 hover:text-white disabled:opacity-30 transition"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
