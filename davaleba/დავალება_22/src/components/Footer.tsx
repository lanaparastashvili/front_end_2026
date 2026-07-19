import Logo from "./Logo";
import {
  TwitchIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  FacebookIcon,
} from "./icons";

const navLinks = ["Contato", "Sobre", "Suporte", "Empregos"];

const socials = [
  { label: "Twitch", Icon: TwitchIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Twitter", Icon: TwitterIcon },
  { label: "YouTube", Icon: YoutubeIcon },
  { label: "Facebook", Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main row */}
        <div className="flex flex-col gap-6 py-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Logo + nav */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <Logo />
            <nav className="flex flex-wrap items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-display text-[11px] font-semibold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/50 transition-colors hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>


        
      </div>
    </footer>
  );
}
