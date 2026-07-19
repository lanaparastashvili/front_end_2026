import NewsCard from "./NewsCard";
import { news } from "../data/siteData";

export default function LatestNews() {
  const [featured, ...rest] = news;

  return (
    <section id="noticias" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h2 className="font-display text-2xl font-bold uppercase text-white sm:text-3xl">
        Últimas Notícias
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-3 lg:gap-5">
        <div className="lg:col-span-2">
          <NewsCard news={featured} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
          {rest.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
