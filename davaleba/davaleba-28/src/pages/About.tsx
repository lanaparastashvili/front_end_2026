import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.65, ease: 'easeOut' as const },
  }),
}

const slideIn = (direction: 'left' | 'right') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -60 : 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
})

const values = [
  {
    image: '/scooter_rider.jpg',
    title: 'Our team',
    desc: 'Our team is full of people who are passionate about making cities better places to live. We\'re always looking for talented individuals to join us.',
  },
  {
    image: '/telemetry_woman.jpg',
    title: 'Our integrity',
    desc: 'We always aim to be transparent about the way we work. If a scooter is slow or unavailable, you\'ll know about it before you get there.',
  },
  {
    image: '/payment_hand.jpg',
    title: 'Our community',
    desc: 'After successful, life-changing projects in other cities, we\'re excited to welcome new cities to the Scoot family.',
  },
]

const faqs = [
  {
    q: 'How it works',
    a: 'Find a Scoot near you using the app or website. Once you\'ve found a Scoot, just scan the QR code and you\'re good to go! Scoot supports both iOS and Android. Just download and register to get started.',
  },
  {
    q: 'Safe driving',
    a: 'Our scooters are all limited to a top speed of 25mph. We ask that all riders wear helmets and follow local traffic laws. If you\'re unsure about the rules in your area, you can always check our Safety page.',
  },
  {
    q: 'Do I need a license to ride?',
    a: 'Depending on where you live, you may need a license to ride a scooter. You can check whether you need a license on our license requirements page. Licenses are required in some states and cities.',
  },
  {
    q: 'Should I wear a helmet?',
    a: 'Yes, we recommend wearing a helmet whenever you ride a Scoot. Helmets are required by law in some areas and are always a good idea for safety.',
  },
  {
    q: 'How about the rules of the road?',
    a: 'In the city, you\'ll need to obey all standard road rules. Our app will give you a checklist of what\'s required for riding in your area. We\'ll let you know about any special rules or considerations.',
  },
  {
    q: 'What if I damage my Scoot?',
    a: 'You\'re responsible for any damage done to the scooter during your ride. We\'ll notify you of the damage assessment and charge you accordingly. We recommend taking care of the scooter as if it were your own.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-bold text-[#333A44] text-lg group-hover:text-[#FCB72B] transition-colors duration-200">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown size={20} className={open ? 'text-[#FCB72B]' : 'text-[#939CAA]'} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[#939CAA] leading-relaxed">{a}</p>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative bg-[#333A44] py-24 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute right-0 top-0 bottom-0 w-96 flex items-center justify-center overflow-hidden"
        >
          <div className="w-[400px] h-[400px] rounded-full border-2 border-[#FCB72B]/20 absolute" />
          <div className="w-[240px] h-[240px] rounded-full border-2 border-[#FCB72B]/15 absolute" />
        </motion.div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold text-white font-[Space_Mono]"
          >
            About
          </motion.h1>
        </div>
      </section>

      {/* MOBILITY SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={slideIn('left')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
              <img src="/about_mobility.jpg" alt="Mobility" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">
              <div className="h-px bg-[#FCB72B] w-24" />
              <div className="w-4 h-4 border-t-2 border-r-2 border-[#FCB72B] rotate-45 -ml-3" />
            </div>
          </motion.div>
          <motion.div
            variants={slideIn('right')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#333A44] mb-6 font-[Space_Mono] leading-tight">
              Mobility for the<br />digital era
            </h2>
            <p className="text-[#939CAA] leading-relaxed text-lg">
              Getting around should be simple — and with Scoot, it is. We built our app and fleet to be the easiest way to navigate the urban sprawl. Whether it's a quick trip to the store, or a commute across town, Scoot makes mobility effortless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BETTER URBAN LIVING */}
      <section className="py-20 px-6 bg-[#F2F4F6]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div
            variants={slideIn('right')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex-shrink-0"
          >
            <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
              <img src="/city_scooter.jpg" alt="Better urban living" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">
              <div className="w-4 h-4 border-t-2 border-l-2 border-[#FCB72B] -rotate-45 -mr-3" />
              <div className="h-px bg-[#FCB72B] w-24" />
            </div>
          </motion.div>
          <motion.div
            variants={slideIn('left')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#333A44] mb-6 font-[Space_Mono] leading-tight">
              Better urban<br />living
            </h2>
            <p className="text-[#939CAA] leading-relaxed text-lg">
              We want to improve the way you get around. Our goal is to make it easier for everyone to navigate the city with less stress and more joy. By joining Scoot, you\'re helping to build a cleaner, quieter, better urban environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#333A44] mb-16 text-center font-[Space_Mono]"
          >
            Our values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((val, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-36 h-36 rounded-full overflow-hidden mb-8 ring-4 ring-[#FCB72B]/30">
                  <img src={val.image} alt={val.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-px h-12 bg-[#FCB72B] mb-6" />
                <h3 className="text-xl font-bold text-[#333A44] mb-4 font-[Space_Mono]">{val.title}</h3>
                <p className="text-[#939CAA] leading-relaxed text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6 bg-[#F2F4F6]">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#333A44] mb-12 font-[Space_Mono]"
          >
            FAQs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-none shadow-sm p-8"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
