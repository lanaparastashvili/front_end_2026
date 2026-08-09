import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Import assets 1 to 11 strictly as numbered
import pirveli from '../assets/pirveli.png'       // Asset 1 (პირველი)
import meore from '../assets/meore.svg'           // Asset 2 (მეორე)
import mesame from '../assets/mesame.svg'         // Asset 3 (მესამე)
import meotxe from '../assets/meotxe.svg'         // Asset 4 (მეოთხე)
import mexute from '../assets/mexute.png'         // Asset 5 (მეხუთე)
import meeqvse from '../assets/meeqvse.svg'       // Asset 6 (მეექვსე)
import meshvide from '../assets/meshvide.png'     // Asset 7 (მეშვიდე)
import merve from '../assets/merve.png'           // Asset 8 (მერვე)
import mecxre from '../assets/mecxre.png'         // Asset 9 (მეცხრე)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

const steps = [
  {
    num: '01',
    label: 'Locate with app',
    desc: 'Use the app to find the nearest scooter to you. We are continuously placing scooters in the areas with most demand, so one should never be far away!',
    icon: meore,
  },
  {
    num: '02',
    label: 'Pick your scooter',
    desc: 'We show the live status & battery for the scooters nearest to you. So you know how much charge step has & can ride with total peace of mind.',
    icon: mesame,
  },
  {
    num: '03',
    label: 'Enjoy the ride',
    desc: 'Scan the QR code and the bike will unlock. Retract the cable lock, put on a helmet, and you\'re off! Always obey local traffic laws and safety rules.',
    icon: meotxe,
  },
]

export default function Home() {
  return (
    <div className="pt-20 bg-white font-sans text-[#333A44] overflow-x-hidden">

      {/* 1. HERO SECTION (Asset 1 - pirveli.png) */}
      <section className="relative bg-[#333A44] min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden">
        {/* Full Width Hero Background Image - Asset 1 */}
        <div className="absolute inset-0 z-0">
          <img
            src={pirveli}
            alt="Scooter Hero Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#333A44]/90 via-[#333A44]/75 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
          <div className="max-w-xl">
            <motion.h1
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[Space_Mono] leading-[1.1] mb-6 tracking-tight"
            >
              Scooter sharing <br />
              made simple
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-[#939CAA] text-base lg:text-lg mb-10 leading-relaxed max-w-lg"
            >
              Scoot takes the hassle out of urban mobility. Our bikes are placed in convenient locations in each of our cities. Unlock your scooter, locate the nearest ride with a tap, and you're away!
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <Link
                to="/locations"
                className="inline-flex items-center justify-center bg-[#FCB72B] text-[#333A44] px-10 py-4 font-bold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 shadow-md font-[Space_Mono]"
              >
                Get Scootin
              </Link>
            </motion.div>
          </div>
        </div>



        {/* White Outline Circles Graphic on Far Right */}
        <div className="absolute right-[-40px] top-[50%] -translate-y-1/2 hidden xl:flex items-center gap-4 z-10 pointer-events-none opacity-80">
          <div className="w-[180px] h-[180px] rounded-full border-4 border-white/20" />
          <div className="w-[180px] h-[180px] rounded-full border-4 border-white/20 -ml-24" />
        </div>
      </section>

      {/* 2. HOW IT WORKS / STEPS (Assets 2, 3, 4 - meore.svg, mesame.svg, meotxe.svg) */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Gray connecting line behind icons */}
          <div className="absolute top-[48px] left-[15%] right-[15%] h-[4px] bg-[#E5E7EB] hidden md:block -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col items-start text-left relative z-10"
              >
                {/* SVG Circle Icon - Assets 2, 3, 4 */}
                <div className="w-24 h-24 mb-8 relative flex-shrink-0">
                  <img
                    src={step.icon}
                    alt={step.label}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#333A44] mb-4 font-[Space_Mono]">
                  {step.label}
                </h3>
                <p className="text-[#939CAA] text-sm lg:text-base leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE 1: Riding Telemetry (Assets 5 & 6 - mexute.png, meeqvse.svg) */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333A44] mb-6 font-[Space_Mono] leading-[1.15] tracking-tight">
              Easy to use <br />
              riding telemetry
            </h2>
            <p className="text-[#939CAA] text-base leading-relaxed mb-8">
              The Scoot app is available with safety telemetry. This means it can show you your average speed, how long you've been using the scooter, your distance travelled, and many more things inside our easy to use app.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center justify-center bg-[#FCB72B] text-[#333A44] px-9 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#333A44] hover:text-white transition-all duration-300 shadow-md font-[Space_Mono]"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Right Image Container - Asset 5 (mexute.png) + Asset 6 (meeqvse.svg) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative flex-shrink-0"
          >
            <div className="w-80 h-80 sm:w-[445px] sm:h-[445px] rounded-full overflow-hidden relative shadow-2xl">
              <img
                src={mexute}
                alt="Easy to use riding telemetry"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Yellow Arrow Graphic - Asset 6 (meeqvse.svg) */}
            <div className="absolute top-1/2 right-[-240px] -translate-y-1/2 hidden xl:block pointer-events-none">
              <img
                src={meeqvse}
                alt="Decorative yellow arrow"
                className="w-[740px] h-auto object-contain"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. FEATURE 2: Coming to a city near you (Assets 7 & 8 - meshvide.png, merve.png) */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
          
          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333A44] mb-6 font-[Space_Mono] leading-[1.15] tracking-tight">
              Coming to a city <br />
              near you
            </h2>
            <p className="text-[#939CAA] text-base leading-relaxed mb-8">
              Scoot is available in 4 major cities so far. We're expanding rapidly, so be sure to follow us to know if we're coming to your city next. We're aiming to launch in at least 8 more cities over the coming year.
            </p>
            <Link
              to="/locations"
              className="inline-flex items-center justify-center bg-[#FCB72B] text-[#333A44] px-9 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#333A44] hover:text-white transition-all duration-300 shadow-md font-[Space_Mono]"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Left Image Container - Asset 7 (meshvide.png) + Asset 8 (merve.png) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative flex-shrink-0"
          >
            <div className="w-80 h-80 sm:w-[445px] sm:h-[445px] rounded-full overflow-hidden relative shadow-2xl">
              <img
                src={meshvide}
                alt="Coming to a city near you"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Graphic Asset 8 - merve.png */}
            <div className="absolute top-1/2 left-[-260px] -translate-y-1/2 hidden xl:block pointer-events-none">
              <img src={merve} alt="Decorative graphic merve" className="w-[356px] h-auto object-contain" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. FEATURE 3: Zero Hassle Payments (Asset 9 - mecxre.png) */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333A44] mb-6 font-[Space_Mono] leading-[1.15] tracking-tight">
              Zero hassle <br />
              payments
            </h2>
            <p className="text-[#939CAA] text-base leading-relaxed mb-8">
              Our payment system is as hassle free as can be. We support credit card, debit card, and digital wallets. You can also link your PayPal account inside the app. Ready to pay later? We support pay in 3 installments too.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center justify-center bg-[#FCB72B] text-[#333A44] px-9 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#333A44] hover:text-white transition-all duration-300 shadow-md font-[Space_Mono]"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Right Image Container - Asset 9 (mecxre.png) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative flex-shrink-0"
          >
            <div className="w-80 h-80 sm:w-[445px] sm:h-[445px] rounded-full overflow-hidden relative shadow-2xl">
              <img
                src={mecxre}
                alt="Zero hassle payments"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Yellow Arrow Graphic for Feature 3 */}
            <div className="absolute top-1/3 right-[-240px] hidden xl:block pointer-events-none">
              <svg width="450" height="150" viewBox="0 0 450 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M450 20 H150 V120 H40" stroke="#FCB72B" strokeWidth="15" strokeLinejoin="bevel" />
                <path d="M60 100 L25 120 L60 140" stroke="#FCB72B" strokeWidth="15" strokeLinejoin="bevel" />
              </svg>
            </div>
          </motion.div>

        </div>
      </section>



    </div>
  )
}
