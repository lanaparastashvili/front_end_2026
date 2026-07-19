import type { NewsItem } from "../types";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const isLarge = news.size === "large";

  return (
    <a
      href={`#${news.id}`}
      className={`group relative block overflow-hidden rounded-md border border-line ${
        isLarge ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[16/9]"
      }`}
      style={{
        background: `linear-gradient(135deg, ${news.gradient[0]} 0%, ${news.gradient[1]} 100%)`,
      }}
    >
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent transition-opacity group-hover:from-ink/95" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="font-display text-[10px] font-semibold uppercase tracking-widest text-r-gold">
          {news.category}
        </p>
        <h3
          className={`mt-1 font-display font-bold uppercase leading-snug text-white ${
            isLarge ? "text-lg sm:text-2xl" : "text-sm sm:text-base"
          }`}
        >
          {news.title}
        </h3>
        <p className="mt-1 text-xs text-white/50">{news.date}</p>
      </div>
    </a>
  );
}
