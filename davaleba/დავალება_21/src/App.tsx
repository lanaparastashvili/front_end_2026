import { useState } from 'react'
import { planets } from './data'
import Navbar from './components/Navbar'
import TabButtons from './components/TabButtons'
import StatsBar from './components/StatsBar'

type TabKey = 'overview' | 'structure' | 'geology'

export default function App() {
  const [selectedName, setSelectedName] = useState(planets[0].name)
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  const planet = planets.find((p) => p.name === selectedName)!
  const section = planet[activeTab]

  function handleSelect(name: string) {
    setSelectedName(name)
    setActiveTab('overview')
  }

  return (
    <div className="app">
      <Navbar selectedName={selectedName} onSelect={handleSelect} />

      <main>
        <div className="content">
          <div className="planet-container">
            <div className="planet-image-wrapper">
              <img
                className="planet-image"
                src={planet.image}
                alt={`${planet.name} planet`}
              />
              {activeTab === 'structure' && planet.structureImage && (
                <img
                  className="planet-structure-image"
                  src={planet.structureImage}
                  alt={`${planet.name} internal structure`}
                />
              )}
              {activeTab === 'geology' && planet.geologyImage && (
                <img
                  className="planet-geology-image"
                  src={planet.geologyImage}
                  alt={`${planet.name} geology`}
                />
              )}
            </div>
          </div>

          <div className="info-container">
            <div className="info">
              <h1>{planet.name}</h1>
              <p>{section.content}</p>
              <div className="source">
                <span>Source:</span>
                <a href={section.source} target="_blank" rel="noreferrer">
                  Wikipedia
                </a>
              </div>
            </div>

            <TabButtons activeTab={activeTab} onChange={setActiveTab} accent={planet.accent} />
          </div>
        </div>

        <StatsBar planet={planet} accent={planet.accent} />
      </main>
    </div>
  )
}
