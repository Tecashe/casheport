// "use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Smartphone, Zap, Database, Cpu, Layers } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const skillsContainerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills = [
    {
      id: 1,
      icon: Code2,
      label: "Frontend",
      items: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      proficiency: 95,
    },
    {
      id: 2,
      icon: Smartphone,
      label: "Mobile",
      items: ["React Native", "Flutter", "iOS", "Android"],
      proficiency: 85,
    },
    {
      id: 3,
      icon: Database,
      label: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "GraphQL"],
      proficiency: 90,
    },
    {
      id: 4,
      icon: Cpu,
      label: "DevOps",
      items: ["Docker", "AWS", "CI/CD", "Kubernetes"],
      proficiency: 80,
    },
    {
      id: 5,
      icon: Layers,
      label: "Architecture",
      items: ["System Design", "Microservices", "Scalability", "Performance"],
      proficiency: 92,
    },
    {
      id: 6,
      icon: Zap,
      label: "Tools",
      items: ["Git", "Figma", "Testing", "Analytics"],
      proficiency: 88,
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{
            animation: inView ? "float 6s ease-in-out infinite" : "none",
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          style={{
            animation: inView ? "float 8s ease-in-out infinite 1s" : "none",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Profile Section */}
          <div
            className="flex justify-center"
            style={{
              animation: inView ? "slideInLeft 0.8s ease-out forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Rotating border ring */}
              <div
                className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-white/30 to-white/5 bg-clip-border opacity-0 animate-spin"
                style={{
                  animationDuration: "8s",
                  opacity: inView ? 0.4 : 0,
                }}
              />

              {/* Main image container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] bg-gradient-to-br from-white/10 to-black border border-white/20 group hover:shadow-[0_30px_80px_rgba(255,255,255,0.15)] transition-all duration-500">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-8xl">
                  👨‍💻
                </div>
              </div>

              {/* Animated orbit circles */}
              <div
                className="absolute -inset-8 rounded-full border border-white/10"
                style={{
                  animation: inView ? "spin 20s linear infinite" : "none",
                }}
              />
              <div
                className="absolute -inset-16 rounded-full border border-white/5"
                style={{
                  animation: inView ? "spin 30s linear infinite reverse" : "none",
                }}
              />

              {/* Floating badges */}
              <div
                className="absolute -top-4 -right-4 px-4 py-2 bg-white text-black font-bold rounded-full text-sm shadow-[0_10px_30px_rgba(255,255,255,0.3)]"
                style={{
                  animation: inView ? "float 3s ease-in-out infinite" : "none",
                }}
              >
                5+ yrs
              </div>
              <div
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-white/20 text-white font-bold rounded-full text-sm border border-white/40 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                style={{
                  animation: inView ? "float 4s ease-in-out infinite 0.5s" : "none",
                }}
              >
                Expert Dev
              </div>
            </div>
          </div>

          {/* Right: About Content */}
          <div className="space-y-8">
            <div
              style={{
                animation: inView ? "slideInRight 0.8s ease-out forwards" : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">About Me</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-white to-transparent rounded-full" />
            </div>

            <p
              className="text-lg text-white/70 leading-relaxed font-light"
              style={{
                animation: inView ? "slideInRight 0.8s ease-out 0.1s forwards" : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              I'm a passionate full-stack developer with 5+ years of experience building digital products that users
              love. Specializing in creating fast, scalable, and beautifully designed applications with meticulous
              attention to detail.
            </p>

            <p
              className="text-lg text-white/60 leading-relaxed font-light"
              style={{
                animation: inView ? "slideInRight 0.8s ease-out 0.2s forwards" : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              My journey started with React, evolved through Vite's ecosystem, and expanded into mobile development and
              cloud architecture. I believe in clean code, user-centric design, performance-first development, and
              continuous learning.
            </p>

            {/* Stats section */}
            <div
              className="grid grid-cols-3 gap-6 py-8 mt-8"
              style={{
                animation: inView ? "slideInRight 0.8s ease-out 0.3s forwards" : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              {[
                { number: "40+", label: "Projects" },
                { number: "100+", label: "Happy Clients" },
                { number: "99.9%", label: "Uptime" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:translate-y-[-4px] text-center group"
                >
                  <div className="text-3xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid - Revolutionary Display */}
        <div className="mb-20">
          <h3
            className="text-3xl font-bold mb-4 text-white"
            style={{
              animation: inView ? "fadeInUp 0.8s ease-out forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            Core Competencies
          </h3>
          <div
            className="w-20 h-1 bg-gradient-to-r from-white to-transparent rounded-full"
            style={{
              animation: inView ? "slideIn 1s ease-out 0.1s forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          />
        </div>

        <div
          ref={skillsContainerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            animation: inView ? "fadeInUp 0.8s ease-out 0.2s forwards" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          {skills.map((skill, idx) => {
            const Icon = skill.icon
            const isHovered = hoveredSkill === skill.id

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="group relative"
                style={{
                  animation: inView ? `slideInUp 0.6s ease-out ${0.3 + idx * 0.08}s forwards` : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                {/* Main card */}
                <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:border-white/40 transition-all duration-500 cursor-default group-hover:translate-y-[-12px] will-change-transform">
                  {/* Icon with lift effect */}
                  <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-white/80 group-hover:text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] group-hover:shadow-[0_12px_36px_rgba(255,255,255,0.15)] group-hover:translate-y-[-4px] transition-all duration-300">
                    <Icon size={32} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white/95 transition-colors">
                    {skill.label}
                  </h3>

                  {/* Proficiency bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-white/70 group-hover:text-white/90 transition-colors">
                        Proficiency
                      </span>
                      <span className="text-xs font-bold text-white/60 group-hover:text-white/80 transition-colors">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20 group-hover:border-white/40 transition-colors">
                      <div
                        className="h-full bg-gradient-to-r from-white via-white/80 to-white/60 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-out"
                        style={{
                          width: inView && isHovered ? `${skill.proficiency}%` : "0%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Skills list */}
                  <ul className="space-y-3">
                    {skill.items.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-white/70 group-hover:text-white/90 transition-all duration-300"
                        style={{
                          animation: isHovered ? `slideInLeft 0.3s ease-out ${i * 0.05}s forwards` : "none",
                          opacity: isHovered ? 1 : 0.8,
                          transform: isHovered ? "translateX(0)" : "translateX(-10px)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full group-hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div
          className="mt-20 p-12 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
          style={{
            animation: inView ? "fadeInUp 0.8s ease-out 0.4s forwards" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          <div className="text-center">
            <p className="text-white/70 mb-6 text-lg">Ready to collaborate on your next project?</p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-white text-black font-bold rounded-xl shadow-[0_12px_36px_rgba(255,255,255,0.25)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.35)] hover:translate-y-[-6px] active:translate-y-[-2px] transition-all duration-300 overflow-hidden relative group/cta"
            >
              <span className="relative z-10">Let's Build Something Amazing</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity -translate-x-full group-hover/cta:translate-x-full duration-700" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
