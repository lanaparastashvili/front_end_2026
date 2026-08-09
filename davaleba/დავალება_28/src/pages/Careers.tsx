import { motion } from 'framer-motion'
import { ArrowRight, Users, Heart, Globe } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: 'easeOut' as const },
  }),
}

const reasons = [
  {
    icon: <Users size={28} />,
    title: 'Our team',
    desc: 'A diverse group of passionate humans. Our culture values authenticity, merit, and ambition.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Our integrity',
    desc: 'Company decisions are always made with transparency. We hold each other to the highest standards.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Our community',
    desc: 'Expanding to cities across the globe — we work with local authorities to create better commutes for all.',
  },
]

type Job = {
  title: string
  location: string
  type: string
}

const jobs: Job[] = [
  { title: 'General Manager', location: 'United Kingdom', type: 'Full Time' },
  { title: 'UX/UI Designer', location: 'United Kingdom', type: 'Full Time' },
  { title: 'Blog Content Copywriter', location: 'United States', type: 'Part Time' },
  { title: 'Graphic Designer', location: 'United Kingdom', type: 'Full Time' },
  { title: 'Fleet Supervisor', location: 'Italy', type: 'Full Time' },
  { title: 'UX Analyst', location: 'United Kingdom', type: 'Full Time' },
]

export default function Careers() {
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
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white font-[Space_Mono] mb-6 leading-tight">
              Care to join<br />our mission?
            </h1>
            <p className="text-[#939CAA] leading-relaxed text-lg">
              We're always looking for creative individuals who are passionate about our mission. Scoot is a fun environment and we place a high value on solving urban transportation problems.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-[#FCB72B]/30 flex-shrink-0"
          >
            <img src="/scooter_rider.jpg" alt="Team member" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#333A44] mb-16 text-center font-[Space_Mono]"
          >
            Why join us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.65 }}
                className="flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-20 h-20 rounded-full bg-[#FCB72B] flex items-center justify-center mb-6 text-[#333A44]">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333A44] mb-4 font-[Space_Mono]">{reason.title}</h3>
                <p className="text-[#939CAA] leading-relaxed text-sm">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-24 px-6 bg-[#F2F4F6]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#333A44] mb-12 font-[Space_Mono]"
          >
            Open positions
          </motion.h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ x: 6 }}
                className="bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-[#FCB72B]"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#333A44] group-hover:text-[#FCB72B] transition-colors duration-200 font-[Space_Mono]">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-[#939CAA]">
                    <span>{job.location}</span>
                    <span className="w-1 h-1 rounded-full bg-[#939CAA]" />
                    <span className="text-[#FCB72B] font-medium">{job.type}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-[#FCB72B] text-[#333A44] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#333A44] hover:text-white transition-all duration-300 whitespace-nowrap group">
                  Apply
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
