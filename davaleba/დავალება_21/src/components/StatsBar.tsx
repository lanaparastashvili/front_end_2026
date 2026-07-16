import { Planet } from '../data'

interface StatsBarProps {
  planet: Planet;
  accent: string;
}

export default function StatsBar({ planet, accent }: StatsBarProps) {
  const stats = [
    { label: "Rotation Time", value: planet.rotation },
    { label: "Revolution Time", value: planet.revolution },
    { label: "Radius", value: planet.radius },
    { label: "Average Temp.", value: planet.temperature },
  ];

  return (
    <div className="stats" style={{ "--accent": accent } as React.CSSProperties}>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="label">{s.label}</div>
          <div className="value">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
