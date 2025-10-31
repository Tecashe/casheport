"use client"

import { useRef, useEffect } from "react"
import { Download } from "lucide-react"

interface Experience {
  id: number
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Tech Innovations Inc",
    role: "Senior Full-Stack Developer",
    period: "2021 - Present",
    description: "Leading frontend development for enterprise SaaS platform serving 100K+ users",
    achievements: [
      "Architected React component system reducing load time by 40%",
      "Mentored 5 junior developers and established code standards",
      "Implemented real-time features using WebSockets",
    ],
  },
  {
    id: 2,
    company: "Digital Agency Co",
    role: "React Developer",
    period: "2019 - 2021",
    description: "Developed responsive web applications for Fortune 500 clients",
    achievements: [
      "Built 15+ client projects with 99.9% uptime",
      "Optimized bundle size by 35% using code splitting",
      "Led migration from Class to Functional components",
    ],
  },
  {
    id: 3,
    company: "StartUp Labs",
    role: "Junior Developer",
    period: "2017 - 2019",
    description: "Full-stack development on early-stage product launches",
    achievements: [
      "Shipped 3 production apps in first year",
      "Learned full MERN stack end-to-end",
      "Contributed to 50+ GitHub commits monthly",
    ],
  },
]

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = timelineRef.current?.querySelectorAll("[data-timeline-item]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="relative py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-white to-transparent rounded-full animate-draw-line" />
        </div>

        <div ref={timelineRef} className="space-y-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              data-timeline-item
              className="ml-0 md:ml-24 relative"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Timeline Node */}
              <div className="absolute -left-5 md:-left-16 top-2 w-3 h-3 md:w-6 md:h-6 bg-white rounded-full border-4 border-black shadow-neumorphic-1" />

              <div className="glass rounded-lg p-6 md:p-8 shadow-neumorphic-1 hover:shadow-neumorphic-2 transition-all duration-300 group">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <p className="text-lg text-white/60 font-semibold mb-1">{exp.company}</p>
                  <p className="text-sm text-white/40">{exp.period}</p>
                </div>

                <p className="text-white/70 mb-6 leading-relaxed">{exp.description}</p>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-white/60">Key Achievements</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-white/60 flex items-start gap-3">
                        <span className="text-white/40 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CV Download */}
        <div className="mt-16 p-8 md:p-12 glass rounded-xl shadow-neumorphic-2 text-center">
          <p className="text-white/60 mb-6">Want to know more? Download my full resume</p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-neumorphic-2 hover:shadow-neumorphic-3 hover:scale-105 transition-all">
            <Download size={20} />
            Download CV
          </button>
        </div>
      </div>
    </section>
  )
}
