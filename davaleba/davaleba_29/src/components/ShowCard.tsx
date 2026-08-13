import React from 'react';
import type { MovieItem } from '../types/movie';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { getImageUrl } from '../utils/imageHelper';

interface ShowCardProps {
  show: MovieItem;
  isTrending?: boolean;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, isTrending = false }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const year = show.year;
  const rating = show.rating;
  const imageUrl = getImageUrl(show.image);
  const saved = isBookmarked(show.title);

  if (isTrending) {
    return (
      <div className="relative flex-none w-[470px] h-[230px] rounded-xl overflow-hidden group mr-6">
        <img src={imageUrl} alt={show.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div 
          onClick={() => toggleBookmark(show)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10 cursor-pointer"
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center text-gray-300 text-sm mb-1 gap-2">
            <span>{year}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{show.type}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{rating}</span>
          </div>
          <h3 className="text-white text-2xl font-semibold tracking-wide">{show.title}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 group relative">
      <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
        <img src={imageUrl} alt={show.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div 
          onClick={() => toggleBookmark(show)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer ${saved ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
      </div>
      <div>
        <div className="flex items-center text-gray-400 text-xs mb-1 gap-2 font-medium">
          <span>{year}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{show.type}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{rating}</span>
        </div>
        <h3 className="text-white text-lg font-semibold truncate tracking-wide">{show.title}</h3>
      </div>
    </div>
  );
};

export default ShowCard;
