import { planets } from '../data'

interface NavbarProps {
  selectedName: string;
  onSelect: (name: string) => void;
}

export default function Navbar({ selectedName, onSelect }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="logo">THE PLANETS</div>
      <ul className="nav-links">
        {planets.map((p) => (
          <li key={p.name}>
            <button
              className={p.name === selectedName ? "active" : ""}
              style={{ "--accent": p.accent } as React.CSSProperties}
              onClick={() => onSelect(p.name)}
            >
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
