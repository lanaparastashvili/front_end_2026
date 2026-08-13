import React, { useState } from 'react';
import moviesData from '../data/movies.json';
import TopBar from '../components/TopBar';
import ShowCard from '../components/ShowCard';
import type { MovieItem } from '../types/movie';

const TvSeries: React.FC = () => {
  const [searchResults, setSearchResults] = useState<MovieItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const allMovies = [...moviesData.trending, ...moviesData.recommended_for_you];
  const uniqueItems = Array.from(new Map(allMovies.map(item => [item.title, item])).values());
  const seriesList = uniqueItems.filter(item => item.type === 'TV Series');

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const q = query.toLowerCase();
    const results = seriesList.filter(item => item.title.toLowerCase().includes(q));
    setSearchResults(results);
  };

  const displayList = isSearching ? searchResults : seriesList;

  return (
    <div className="flex-1 ml-20 px-8 pb-12 max-w-7xl">
      <TopBar onSearch={handleSearch} />
      
      <div className="mt-8">
        <h2 className="text-white text-3xl font-light tracking-wide mb-8">
          {isSearching ? 'Search Results' : 'TV Series'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
          {displayList.map((show, index) => (
            <ShowCard key={index} show={show} />
          ))}
        </div>
        {displayList.length === 0 && (
           <div className="text-gray-400 mt-10">No TV series found.</div>
        )}
      </div>
    </div>
  );
};

export default TvSeries;
