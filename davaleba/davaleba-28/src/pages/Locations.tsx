import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: 'easeOut' as const },
  }),
}

type City = {
  name: string
  country: string
  x: number // % from left on SVG map
  y: number // % from top on SVG map
  available: boolean
  desc: string
}

const cities: City[] = [
  { name: 'New York', country: 'United States', x: 23, y: 34, available: true, desc: 'Our first city. Try Scoot in the Big Apple and get around faster than ever.' },
  { name: 'London', country: 'United Kingdom', x: 45, y: 25, available: true, desc: 'Scoot in the city that never sleeps — skip the Tube and ride in style.' },
  { name: 'Jakarta', country: 'Indonesia', x: 73, y: 57, available: true, desc: 'Navigate the bustling streets of Jakarta with ease on a Scoot.' },
  { name: 'Yokohama', country: 'Japan', x: 82, y: 32, available: true, desc: 'Explore the beautiful port city of Yokohama on a Scoot.' },
  { name: 'Lagos', country: 'Nigeria', x: 47, y: 52, available: false, desc: 'Lagos is our next expansion city. Sign up to be the first to ride.' },
  { name: 'Mumbai', country: 'India', x: 64, y: 46, available: false, desc: 'Coming soon to the financial capital of India. Stay tuned.' },
]

export default function Locations() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative bg-[#333A44] py-24 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute right-0 top-0 bottom-0 w-96 hidden lg:flex items-center justify-center"
        >
          <div className="w-[400px] h-[400px] rounded-full border-2 border-[#FCB72B]/20 absolute" />
          <div className="w-[240px] h-[240px] rounded-full border-2 border-[#FCB72B]/15 absolute" />
        </motion.div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-white font-[Space_Mono]"
          >
            Locations
          </motion.h1>
        </div>
      </section>

      {/* WORLD MAP */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#333A44] mb-4 text-center font-[Space_Mono]"
          >
            Find a Scoot near you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#939CAA] text-center mb-16 max-w-2xl mx-auto"
          >
            We're in 4 great cities so far. Click on a pin to learn more about that location — and sign up for alerts when we come to your city.
          </motion.p>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#F2F4F6] rounded-lg overflow-hidden shadow-inner"
            style={{ paddingBottom: '50%' }}
          >
            {/* Simplified world map SVG */}
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background */}
              <rect width="1000" height="500" fill="#E8EDF2" />

              {/* Simplified continent shapes */}
              {/* North America */}
              <path d="M50,80 L200,60 L240,120 L220,200 L180,240 L130,260 L80,220 L40,180 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />
              {/* South America */}
              <path d="M150,270 L220,260 L240,320 L220,400 L180,430 L140,410 L120,360 L130,300 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />
              {/* Europe */}
              <path d="M380,60 L480,50 L500,100 L470,140 L420,150 L380,130 L360,100 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />
              {/* Africa */}
              <path d="M400,160 L490,150 L510,220 L500,320 L460,370 L420,360 L390,290 L380,200 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />
              {/* Asia */}
              <path d="M510,50 L780,40 L820,100 L800,180 L720,200 L620,190 L560,160 L520,120 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />
              {/* Southeast Asia + Oceania */}
              <path d="M680,210 L780,200 L820,260 L780,300 L700,290 L670,260 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />
              {/* Australia */}
              <path d="M720,320 L830,310 L860,370 L840,420 L780,440 L720,420 L700,370 Z" fill="#C8D0DA" stroke="#B0BAC6" strokeWidth="1" />

              {/* City pins */}
              {cities.map((city) => {
                const cx = (city.x / 100) * 1000
                const cy = (city.y / 100) * 500
                const isSelected = selectedCity?.name === city.name
                return (
                  <g
                    key={city.name}
                    onClick={() => setSelectedCity(isSelected ? null : city)}
                    className="cursor-pointer"
                  >
                    {/* Pulse ring */}
                    {city.available && (
                      <circle cx={cx} cy={cy} r="18" fill="#FCB72B" opacity="0.2">
                        <animate attributeName="r" from="10" to="25" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Pin circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 14 : 10}
                      fill={city.available ? '#FCB72B' : '#939CAA'}
                      stroke="white"
                      strokeWidth="2.5"
                      style={{ transition: 'r 0.3s ease' }}
                    />
                    {/* City label */}
                    <text
                      x={cx}
                      y={cy + 26}
                      textAnchor="middle"
                      fill="#333A44"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="Space Mono, monospace"
                    >
                      {city.name}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* City info popup */}
            {selectedCity && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-xl p-5 w-72 border-t-4 border-t-[#FCB72B]"
              >
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#FCB72B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#333A44] font-[Space_Mono]">{selectedCity.name}</h3>
                    <p className="text-xs text-[#939CAA] mb-2">{selectedCity.country}</p>
                    <p className="text-sm text-[#939CAA] leading-relaxed">{selectedCity.desc}</p>
                    <span className={`inline-block mt-3 text-xs font-bold uppercase tracking-wider px-3 py-1 ${selectedCity.available ? 'bg-[#FCB72B] text-[#333A44]' : 'bg-gray-200 text-[#939CAA]'}`}>
                      {selectedCity.available ? 'Available Now' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* City Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCity(city)}
                className="bg-[#F2F4F6] p-6 cursor-pointer hover:shadow-md transition-all duration-300 border-b-4 border-b-transparent hover:border-b-[#FCB72B] group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${city.available ? 'bg-[#FCB72B]' : 'bg-[#939CAA]'}`} />
                  <h3 className="font-bold text-[#333A44] font-[Space_Mono] group-hover:text-[#FCB72B] transition-colors duration-200">
                    {city.name}
                  </h3>
                </div>
                <p className="text-sm text-[#939CAA]">{city.country}</p>
                <p className="text-xs text-[#939CAA] mt-3 leading-relaxed">{city.desc}</p>
                <div className={`mt-4 inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 ${city.available ? 'bg-[#FCB72B] text-[#333A44]' : 'bg-gray-200 text-[#939CAA]'}`}>
                  {city.available ? 'Available' : 'Coming Soon'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOT LISTED */}
      <section className="py-24 px-6 bg-[#F2F4F6]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#333A44] mb-6 font-[Space_Mono]"
          >
            Your city not listed?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#939CAA] leading-relaxed mb-8 text-lg"
          >
            If your city isn't listed, we might still be coming to you. Sign up for alerts and we'll let you know when Scoot is available in your area.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#FCB72B] text-[#333A44] px-10 py-4 font-bold uppercase tracking-wider hover:bg-[#333A44] hover:text-white transition-all duration-300"
          >
            Notify me
          </motion.button>
        </div>
      </section>
    </div>
  )
}
