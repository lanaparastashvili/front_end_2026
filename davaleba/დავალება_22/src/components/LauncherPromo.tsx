import nine from "../assets/nine.png";






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
    </section>
  );
}