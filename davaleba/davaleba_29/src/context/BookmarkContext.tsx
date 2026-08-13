import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MovieItem } from '../types/movie';

interface BookmarkContextType {
  bookmarks: MovieItem[];
  toggleBookmark: (movie: MovieItem) => void;
  isBookmarked: (title: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<MovieItem[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (movie: MovieItem) => {
    setBookmarks(prev => {
      const exists = prev.some(item => item.title === movie.title);
      if (exists) {
        return prev.filter(item => item.title !== movie.title);
      }
      return [...prev, movie];
    });
  };

  const isBookmarked = (title: string) => bookmarks.some(item => item.title === title);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
