"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["About", "Work", "Experience", "Services", "Contact"]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter relative group cursor-pointer">
            SM
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
          </div>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setActiveNav(item)}
                onMouseLeave={() => setActiveNav("")}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white via-white/50 to-transparent 
                  w-0 group-hover:w-full transition-all duration-300 origin-left"
                />
                {activeNav === item && (
                  <span className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20 blur-sm" />
                )}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden bg-black/60 backdrop-blur-xl mt-2 mx-4 mb-4 p-4 space-y-4 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
