import { useState, useEffect } from "react";
import LiveTracker from "./LiveTracker";
import "./App.css";

const citiesData = [
  { id: 1, name: "თბილისი", temp: 25, condition: "მზიანი" },
  { id: 2, name: "ბათუმი", temp: 22, condition: "წვიმიანი" },
  { id: 3, name: "ქუთაისი", temp: 24, condition: "ღრუბლიანი" },
];

function App() {
  const [activeCity, setActiveCity] = useState(citiesData[0]);

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    console.log("ამინდის აპლიკაცია წარმატებით ჩაიტვირთა");
  }, []);

  useEffect(() => {
    document.title = `ამინდი: ${activeCity.name}`;
  }, [activeCity]);

  return (
    <div className="app">
      <h1>ამინდის აპლიკაცია</h1>

      <div className="city-buttons">
        {citiesData.map((city) => (
          <button
            key={city.id}
            className={city.id === activeCity.id ? "active" : ""}
            onClick={() => setActiveCity(city)}
          >
            {city.name}
          </button>
        ))}
      </div>

  
      <div className="weather-card">
        <h2>{activeCity.name}</h2>
        <p className="temp">{activeCity.temp}°C</p>
        <p>{activeCity.condition}</p>
      </div>

      <hr />

      <button className="live-btn" onClick={() => setIsLive(!isLive)}>
        {isLive ? "გათიშე Live რეჟიმი" : "ჩართე Live რეჟიმი"}
      </button>

      {isLive ? <LiveTracker /> : null}
    </div>
  );
}

export default App;