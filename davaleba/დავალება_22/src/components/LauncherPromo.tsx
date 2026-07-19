import nine from "../assets/nine.png";




const nowAvailable = ["Red Dead Redemption 2", "Grand Theft Auto V"];

export default function LauncherPromo() {
  return (
    <section
      id="launcher"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
    >
      <img
        src={nine}
        alt="Launcher"
        className="w-full h-auto rounded-xl"
      />

      <div className="mt-5 flex flex-wrap gap-3">
        {nowAvailable.map((game) => (
          <span
            key={game}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
          >
            {game}
          </span>
        ))}
      </div>
    </section>
  );
}