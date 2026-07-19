import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedGames from "./components/FeaturedGames";
import LatestNews from "./components/LatestNews";
import LauncherPromo from "./components/LauncherPromo";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <main>
        <Hero />
        <FeaturedGames />
        <LatestNews />
        <LauncherPromo />
      </main>
      <Footer />
    </div>
  );
}
