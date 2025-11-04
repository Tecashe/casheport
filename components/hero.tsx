"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([])

  const roles = ["Full-Stack Developer", "React Specialist", "Vite Enthusiast", "Mobile Builder"]
  const currentRole = roles[Math.floor(Math.random() * roles.length)]

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const container = containerRef.current

    if (!container || !ctx) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    canvas.style.position = "absolute"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.opacity = "0.5"
    container.insertBefore(canvas, container.firstChild)

    const particles: typeof particlesRef.current = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 0.5,
      })
    }
    particlesRef.current = particles

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const dx = p.x - mousePos.x
        const dy = p.y - mousePos.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * 0.3
          p.vy += Math.sin(angle) * 0.3
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 - dist / 200})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        particles.forEach((p2, j) => {
          if (i < j) {
            const dx2 = p.x - p2.x
            const dy2 = p.y - p2.y
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
            if (dist2 < 100) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - dist2 / 500})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => canvas.remove()
  }, [mousePos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      if (!containerRef.current || !textRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 60
      const y = (e.clientY - rect.top - rect.height / 2) / 60

      textRef.current.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20 bg-black"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div ref={textRef} className="transition-transform duration-75 will-change-transform">
          <div className="mb-8 inline-block rounded-3xl p-8 md:p-12 bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Simon Mwangi</h1>
            <p className="text-lg md:text-2xl text-white/70 font-light">{currentRole}</p>
          </div>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Crafting exceptional digital experiences with React, Vite, and modern web technologies. Transforming ideas
            into scalable, beautiful applications.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="group relative px-8 py-4 md:py-5 bg-white text-black font-semibold rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_30px_60px_rgba(255,255,255,0.3),0_0_0_1px_rgba(255,255,255,0.2)] hover:translate-y-[-8px] active:translate-y-[-4px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300 flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10">View My Work</span>
              <ArrowDown size={20} className="relative z-10 group-hover:translate-y-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-700" />
            </button>

            <button className="group relative px-8 py-4 md:py-5 bg-transparent border-2 border-white/40 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-white/10 hover:border-white/80 hover:translate-y-[-6px] active:translate-y-[-2px] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300 overflow-hidden">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-700" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-white/50">Scroll to explore</span>
            <ArrowDown size={20} className="text-white/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
