interface TabButtonsProps {
  activeTab: "overview" | "structure" | "geology";
  onChange: (tab: "overview" | "structure" | "geology") => void;
  accent: string;
}

export default function TabButtons({ activeTab, onChange, accent }: TabButtonsProps) {
  const tabs = [
    { key: "overview", label: "Overview", num: "01" },
    { key: "structure", label: "Internal Structure", num: "02" },
    { key: "geology", label: "Surface Geology", num: "03" },
  ] as const;

  return (
    <div className="tabs" style={{ "--accent": accent } as React.CSSProperties}>
      {tabs.map((t) => (
        <button
          key={t.key}
          className={activeTab === t.key ? "active" : ""}
          onClick={() => onChange(t.key)}
        >
          <span className="num">{t.num}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
