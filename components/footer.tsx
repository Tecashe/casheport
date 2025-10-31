"use client"

import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Simon Mwangi</h3>
            <p className="text-white/60">Full-Stack Developer | React Specialist | Building the Future</p>
          </div>

          <div className="text-center">
            <p className="text-white/60 mb-4">Built with React, Vite, and Tailwind CSS</p>
            <p className="text-sm text-white/40">© 2025 Simon Mwangi. All rights reserved.</p>
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/20 rounded-full hover:bg-white/10 hover:shadow-glow transition-all duration-300 text-white/80 hover:text-white"
            title="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}
