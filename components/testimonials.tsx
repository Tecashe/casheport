"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: number
  author: string
  role: string
  company: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "Sarah Anderson",
    role: "Product Manager",
    company: "TechFlow Inc",
    content:
      "Simon's exceptional ability to transform complex requirements into elegant solutions has been invaluable. His attention to detail and performance optimization resulted in a 60% improvement in load times.",
    rating: 5,
    image: "/professional-headshot-woman.jpg",
  },
  {
    id: 2,
    author: "James Chen",
    role: "CEO",
    company: "StartupHub",
    content:
      "Working with Simon was a game-changer for our platform. He not only delivered the project on time but also mentored our team on best practices. The codebase he left us is maintainable and scalable.",
    rating: 5,
    image: "/professional-headshot-man.jpg",
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Studios",
    content:
      "The collaboration with Simon was seamless. His ability to bridge the gap between design and development, along with his passion for UX, created an exceptional product that users love.",
    rating: 5,
    image: "/professional-headshot-woman-2.jpg",
  },
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const scroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? (activeIndex - 1 + testimonials.length) % testimonials.length
        : (activeIndex + 1) % testimonials.length
    setActiveIndex(newIndex)
  }

  return (
    <section className="relative py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Client Testimonials</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-white to-transparent rounded-full" />
        </div>

        <div ref={containerRef} className="relative">
          <div className="overflow-hidden rounded-3xl">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div
                  className="relative min-h-96 p-12 rounded-3xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl border border-white/20 
                  shadow-[0_20px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  <div className="flex gap-4 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-xl text-white/90 leading-relaxed mb-8 font-light italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-lg"
                    />
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-white/60">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-96" />

          <div className="flex justify-between items-center mt-12">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx)
                    setIsAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  scroll("left")
                  setIsAutoPlay(false)
                }}
                className="group relative w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:border-white/60 flex items-center justify-center text-white transition-all duration-300 
                  hover:bg-white/20 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:translate-y-[-2px]"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  scroll("right")
                  setIsAutoPlay(false)
                }}
                className="group relative w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:border-white/60 flex items-center justify-center text-white transition-all duration-300 
                  hover:bg-white/20 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:translate-y-[-2px]"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
