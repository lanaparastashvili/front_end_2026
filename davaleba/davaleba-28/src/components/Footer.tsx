import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import metertmete from '../assets/metertmete.png'

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#495567] text-white">
      {/* CTA Banner */}
      <div className="bg-[#495567] py-20 px-6 relative overflow-hidden border-b border-gray-600/40">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-md font-[Space_Mono] text-center md:text-left">
            Sign up and <br />
            Scoot off today
          </h2>

          <div className="flex flex-row items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-[#E5E7EB] text-[#333A44] px-5 py-3.5 rounded-lg hover:bg-[#FCB72B] transition-colors duration-300 shadow-md font-mono text-xs font-bold"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-70">Available on the</div>
                <div className="text-xs font-bold">App Store</div>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-[#E5E7EB] text-[#333A44] px-5 py-3.5 rounded-lg hover:bg-[#FCB72B] transition-colors duration-300 shadow-md font-mono text-xs font-bold"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.37.21.8.22 1.19.04l12.12-6.89-2.58-2.59-10.73 9.44zm-1.14-20.9c-.06.19-.1.4-.1.63v19.02c0 .23.04.44.1.63l.07.06 10.65-10.65v-.25L2.11 2.8l-.07.06zm17.53 7.75l-2.42-1.38-2.93 2.94 2.93 2.93 2.44-1.38c.7-.4.7-1.71-.02-2.11zm-18.16 9.43l12.12-6.89-2.58-2.58-9.54 9.47z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-70">Get it on</div>
                <div className="text-xs font-bold">Google Play</div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Footer Main Bar */}
      <div className="bg-[#333A44] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold font-[Space_Mono] text-white hover:text-[#FCB72B] transition-colors duration-300 tracking-tight">
            scoot
          </Link>

          {/* Links */}
          <nav className="flex flex-row items-center gap-8 text-sm text-[#939CAA]">
            {[
              { to: '/about', label: 'About' },
              { to: '/locations', label: 'Location' },
              { to: '/careers', label: 'Careers' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-[#FCB72B] transition-colors duration-200 text-sm font-medium font-sans"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons in Yellow */}
          <div className="flex items-center gap-5">
            {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-[#FCB72B] hover:text-white transition-colors duration-200"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
