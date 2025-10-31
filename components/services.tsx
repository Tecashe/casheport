"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Zap, Rocket, Shield, TrendingUp, Code2, Smartphone, ArrowRight } from "lucide-react"

interface Service {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  details: string[]
  price: string
  badge?: string
}

const services: Service[] = [
  {
    id: 1,
    icon: <Code2 size={40} />,
    title: "Web Development",
    description: "Custom web applications built with React, Vite, and modern web technologies",
    details: ["React & Next.js", "Responsive Design", "Performance Optimized", "SEO Friendly"],
    price: "Premium",
  },
  {
    id: 2,
    icon: <Smartphone size={40} />,
    title: "Mobile Development",
    description: "Cross-platform mobile apps using React Native and Flutter",
    details: ["iOS & Android", "Real-time Features", "Cloud Integration", "Push Notifications"],
    price: "Premium",
  },
  {
    id: 3,
    icon: <Zap size={40} />,
    title: "Performance",
    description: "Optimization for speed, efficiency, and improved user experience",
    details: ["Code Splitting", "Image Optimization", "Caching Strategy", "Bundle Analysis"],
    price: "Standard",
    badge: "Popular",
  },
  {
    id: 4,
    icon: <Shield size={40} />,
    title: "Security",
    description: "Secure authentication, data protection, and best practices implementation",
    details: ["Auth Systems", "Data Encryption", "Security Audit", "Compliance"],
    price: "Enterprise",
  },
  {
    id: 5,
    icon: <TrendingUp size={40} />,
    title: "Scalability",
    description: "Architecting solutions that grow with your business",
    details: ["Architecture Design", "Load Balancing", "Database Optimization", "Monitoring"],
    price: "Enterprise",
  },
  {
    id: 6,
    icon: <Rocket size={40} />,
    title: "Deployment",
    description: "End-to-end deployment and maintenance solutions",
    details: ["CI/CD Pipeline", "Vercel & AWS", "Monitoring & Alerts", "Support"],
    price: "Premium",
  },
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent, serviceId: number) => {
    if (hoveredService !== serviceId) return

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section id="services" className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-40 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          style={{
            animation: inView ? "float 8s ease-in-out infinite" : "none",
          }}
        />
        <div
          className="absolute bottom-32 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{
            animation: inView ? "float 10s ease-in-out infinite 2s" : "none",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <h2
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{
              animation: inView ? "fadeInUp 0.8s ease-out forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            Services
          </h2>
          <div
            className="w-20 h-1.5 bg-gradient-to-r from-white to-transparent rounded-full"
            style={{
              animation: inView ? "slideIn 1s ease-out 0.1s forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          />
          <p
            className="text-xl text-white/70 mt-8 max-w-3xl leading-relaxed font-light"
            style={{
              animation: inView ? "fadeInUp 0.8s ease-out 0.1s forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            Comprehensive development services tailored to bring your ideas to life with premium quality and meticulous
            attention to detail.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            animation: inView ? "fadeInUp 0.8s ease-out 0.2s forwards" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          {services.map((service, idx) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              className="group relative"
              style={{
                animation: inView ? `slideInUp 0.6s ease-out ${0.3 + idx * 0.08}s forwards` : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              {/* Magnetic glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.2), transparent)`,
                }}
              />

              {/* Main card */}
              <div
                className="relative h-full p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/20
                shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
                group-hover:shadow-[0_24px_80px_rgba(255,255,255,0.2),inset_0_2px_0_rgba(255,255,255,0.15)]
                group-hover:border-white/40
                transition-all duration-500
                group-hover:translate-y-[-16px]
                will-change-transform
                flex flex-col"
              >
                {/* Badge */}
                {service.badge && (
                  <div
                    className="absolute -top-4 right-6 px-4 py-2 bg-white text-black font-bold text-xs rounded-full
                    shadow-[0_8px_24px_rgba(255,255,255,0.3)]"
                    style={{
                      animation: inView ? "float 3s ease-in-out infinite" : "none",
                    }}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Icon container with lift */}
                <div
                  className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5
                  flex items-center justify-center text-white/80 group-hover:text-white
                  shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                  group-hover:shadow-[0_16px_40px_rgba(255,255,255,0.2)]
                  group-hover:translate-y-[-8px]
                  transition-all duration-300"
                >
                  {service.icon}
                </div>

                {/* Title and description */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-white/95 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed flex-grow group-hover:text-white/70 transition-colors">
                  {service.description}
                </p>

                {/* Details list with staggered animation */}
                <div className="mb-8 space-y-3">
                  {service.details.map((detail, i) => (
                    <div
                      key={detail}
                      className="flex items-center gap-3 text-white/70 group-hover:text-white/90 transition-all duration-300"
                      style={{
                        animation:
                          hoveredService === service.id ? `slideInLeft 0.3s ease-out ${i * 0.05}s forwards` : "none",
                        opacity: hoveredService === service.id ? 1 : 0.8,
                        transform: hoveredService === service.id ? "translateX(0)" : "translateX(-10px)",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full bg-white group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]
                        transition-all"
                      />
                      {detail}
                    </div>
                  ))}
                </div>

                {/* Price and CTA button */}
                <div className="space-y-4 border-t border-white/10 pt-6 group-hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      Service Tier
                    </span>
                    <span className="font-bold text-white group-hover:text-white/90 transition-colors">
                      {service.price}
                    </span>
                  </div>

                  <button
                    className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white font-semibold
                    group-hover:bg-white hover:text-black
                    shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                    group-hover:shadow-[0_16px_40px_rgba(255,255,255,0.25)]
                    group-hover:translate-y-[-4px] active:translate-y-[-1px]
                    transition-all duration-300
                    flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <span className="relative z-10">Learn More</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="mt-24 p-16 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20
          shadow-[0_20px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
          style={{
            animation: inView ? "fadeInUp 0.8s ease-out 0.4s forwards" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Let's discuss your requirements and find the perfect service package for your needs. I'm available for
                consultations, full-scale projects, and ongoing support.
              </p>
            </div>
            <div className="flex gap-4 justify-end">
              <a
                href="#contact"
                className="group/btn relative px-8 py-4 bg-white text-black font-bold rounded-xl
                shadow-[0_12px_40px_rgba(255,255,255,0.25)]
                hover:shadow-[0_20px_60px_rgba(255,255,255,0.35)]
                hover:translate-y-[-8px] active:translate-y-[-3px]
                transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity -translate-x-full group-hover/btn:translate-x-full duration-700" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }
      `}</style>
    </section>
  )
}
