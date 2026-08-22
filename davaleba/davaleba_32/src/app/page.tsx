"use client";

import { useState } from "react";
import data from "@/data/data.json";
import { Search, CloudRain, CloudSnow, CloudLightning, Sun, Cloud, CloudDrizzle, Droplet, Wind, CloudFog } from "lucide-react";
import { format } from "date-fns";

const iconMap: Record<string, any> = {
  "sun": Sun,
  "cloud-sun": Cloud,
  "cloud": Cloud,
  "cloud-rain": CloudRain,
  "cloud-drizzle": CloudDrizzle,
  "snowflake": CloudSnow,
  "cloud-lightning": CloudLightning,
  "fog": CloudFog,
};

const bgMap: Record<string, string> = {
  "clear": "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2574&auto=format&fit=crop",
  "cloudy": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2651&auto=format&fit=crop",
  "rain": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop",
  "drizzle": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop",
  "snow": "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2708&auto=format&fit=crop",
  "storm": "https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?q=80&w=2670&auto=format&fit=crop",
  "fog": "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2574&auto=format&fit=crop"
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [cityIndex, setCityIndex] = useState(0);

  const city = data.cities[cityIndex];
  const weatherCond = city.current.condition;
  const CurrentIcon = iconMap[city.current.icon] || Cloud;
  
  const bgImage = bgMap[weatherCond] || bgMap["clear"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const index = data.cities.findIndex(c => c.name.toLowerCase() === search.toLowerCase());
    if (index !== -1) {
      setCityIndex(index);
      setSearch("");
    }
  };

  const currentDate = new Date();
  const timeString = format(currentDate, "HH:mm");
  const dateString = format(currentDate, "EEEE, d MMM ''yy");

  return (
    <main 
      className="min-h-screen w-full relative flex flex-col md:flex-row text-white overflow-hidden bg-gray-900"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

      <div className="flex-1 flex flex-col justify-between p-8 md:p-16 z-10 relative">
        <div className="flex items-center text-2xl font-bold tracking-tighter">
          <span>WW</span>
          <CloudLightning className="w-6 h-6 text-yellow-400 ml-1" />
        </div>

        <div className="flex items-end gap-4 md:gap-8 mt-auto md:mb-0 mb-8">
          <h1 className="text-8xl md:text-9xl font-semibold leading-none tracking-tighter">
            {city.current.temperature}&deg;
          </h1>
          <div className="flex flex-col pb-2 md:pb-4">
            <h2 className="text-4xl md:text-5xl font-medium">{city.name}</h2>
            <p className="text-sm md:text-base text-gray-200 mt-1">
              {timeString} - {dateString}
            </p>
          </div>
          <div className="pb-2 md:pb-4 hidden sm:block">
            <CurrentIcon className="w-12 h-12 md:w-16 md:h-16" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-[400px] lg:w-[450px] bg-white/10 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/20 p-8 z-10 relative flex flex-col min-h-[50vh] md:min-h-screen">
        
        <form onSubmit={handleSearch} className="relative mb-10">
          <input
            type="text"
            placeholder="Search Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/50 text-white placeholder-gray-300 py-2 pr-10 focus:outline-none focus:border-white transition-colors"
          />
          <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-white/80" />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-lg font-medium mb-8">Weather Details...</h3>
          
          <h4 className="text-sm font-semibold tracking-wider mb-6">
            {city.current.description.toUpperCase()}
          </h4>

          <div className="space-y-6 text-sm md:text-base">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Temp max</span>
              <div className="flex items-center gap-4">
                <span>{city.details.tempMax}&deg;</span>
                <span className="w-5 flex justify-center text-red-400">🌡️</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Temp min</span>
              <div className="flex items-center gap-4">
                <span>{city.details.tempMin}&deg;</span>
                <span className="w-5 flex justify-center text-blue-400">🌡️</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Humidity</span>
              <div className="flex items-center gap-4">
                <span>{city.details.humidity}%</span>
                <Droplet className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Cloudy</span>
              <div className="flex items-center gap-4">
                <span>{city.details.cloudiness}%</span>
                <Cloud className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Wind</span>
              <div className="flex items-center gap-4">
                <span>{city.details.wind}{data.app.windUnit}</span>
                <Wind className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/30 my-8 w-full" />

          <h3 className="text-lg font-medium mb-6">Today's Weather Forecast...</h3>

          <div className="space-y-6">
            {city.forecast.map((item, idx) => {
              const FIcon = iconMap[item.icon] || Cloud;
              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 w-24">
                    <FIcon className="w-6 h-6" />
                    <div className="flex flex-col">
                      <span className="text-xs">{item.day.slice(0, 3)}</span>
                      <span className="text-xs text-gray-300">{item.condition}</span>
                    </div>
                  </div>
                  <span className="font-medium text-lg">{item.temperature}&deg;</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
