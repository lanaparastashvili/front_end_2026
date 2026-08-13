import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/locations', label: 'Location' },
  { to: '/careers', label: 'Careers' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-[#333A44] font-[Space_Mono] group-hover:text-[#FCB72B] transition-colors duration-300">
              scoot
            </span>
            <div className="ml-1 w-2 h-2 rounded-full bg-[#FCB72B] group-hover:scale-125 transition-transform duration-300" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 relative group ${
                  isActive ? 'text-[#FCB72B]' : 'text-[#939CAA] hover:text-[#333A44]'
                }`
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FCB72B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/locations"
          className="hidden md:inline-flex items-center px-6 py-3 bg-[#FCB72B] text-[#333A44] text-sm font-bold rounded-none hover:bg-[#333A44] hover:text-white transition-all duration-300 uppercase tracking-wider"
        >
          Get Scootin'
        </Link>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-btn"
          className="md:hidden p-2 text-[#333A44]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#333A44] overflow-hidden"
          >
            <nav className="flex flex-col py-6 px-6 gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-200 ${
                      isActive ? 'text-[#FCB72B]' : 'text-white hover:text-[#FCB72B]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/locations"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FCB72B] text-[#333A44] text-sm font-bold uppercase tracking-wider w-full"
              >
                Get Scootin'
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
