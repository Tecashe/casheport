"use client"
import { useState, useEffect } from "react"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: number
  featured: boolean
  category: string
  title: string
  description: string
  longDescription?: string
  image: string
  liveUrl: string
  githubUrl: string
  tech: string[]
  metrics?: { label: string; value: string }[]
  images: string[]
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  allProjects: Project[]
}

export function ProjectModal({ project, onClose, allProjects }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(!!project)

  useEffect(() => {
    setIsOpen(!!project)
    setCurrentImageIndex(0)
  }, [project])

  if (!project || !isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
        style={{
          animation: isOpen ? "fadeIn 0.3s ease-out" : "fadeOut 0.3s ease-out",
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* Modal container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
      >
        <div
          className="relative bg-black border border-white/20 rounded-2xl max-w-4xl w-full 
          shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_80px_rgba(255,255,255,0.1)]
          max-h-[90vh] overflow-y-auto"
          style={{
            animation: isOpen ? "slideUp 0.4s ease-out" : "slideDown 0.3s ease-in",
            opacity: isOpen ? 1 : 0,
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 
            flex items-center justify-center text-white hover:bg-black hover:border-white/60
            transition-all duration-300 hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)]
            hover:translate-y-[-2px]"
          >
            <X size={20} />
          </button>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left: Image carousel with clock effect */}
            <div className="space-y-6">
              <div className="relative group">
                {/* Main image container */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-video bg-black/40 
                  shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
                  border border-white/20 group-hover:border-white/40 transition-all duration-300"
                >
                  <img
                    src={project.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} preview ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Clock-ticking circular progress indicator */}
                  <div className="absolute top-4 right-4 w-16 h-16">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      style={{
                        animation: `clockTick ${project.images.length * 2}s linear infinite`,
                      }}
                    >
                      {/* Background circle */}
                      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />

                      {/* Progress circle (the ticking effect) */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeDasharray={`${(2 * Math.PI * 28 * (currentImageIndex + 1)) / project.images.length} ${2 * Math.PI * 28}`}
                        strokeLinecap="round"
                        style={{
                          transition: "stroke-dasharray 0.5s ease-out",
                        }}
                      />

                      {/* Center dot */}
                      <circle cx="32" cy="32" r="3" fill="white" />
                    </svg>

                    {/* Text indicator */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/80">
                      {currentImageIndex + 1}/{project.images.length}
                    </div>
                  </div>

                  {/* Image counter with gradient */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-semibold">
                    Image {currentImageIndex + 1} of {project.images.length}
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 border border-white/20
                  hover:bg-black/70 hover:border-white/60 flex items-center justify-center text-white
                  transition-all duration-300 hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)]
                  hover:translate-y-[-4px] opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 border border-white/20
                  hover:bg-black/70 hover:border-white/60 flex items-center justify-center text-white
                  transition-all duration-300 hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)]
                  hover:translate-y-[-4px] opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnail previews */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-none w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 
                    ${idx === currentImageIndex ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "border-white/20 hover:border-white/40"}
                    hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:translate-y-[-2px]`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Project details */}
            <div className="space-y-6 flex flex-col">
              {/* Category and title */}
              <div>
                <div
                  className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-white/80
                  mb-3 shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
                >
                  {project.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{project.title}</h2>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-white/80 leading-relaxed">{project.description}</p>
                <p className="text-white/70 leading-relaxed text-sm">{project.longDescription}</p>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
                  {project.metrics.map(({ label, value }) => (
                    <div key={label} className="group">
                      <div className="text-2xl font-bold text-white group-hover:text-white/80 transition-colors">
                        {value}
                      </div>
                      <div className="text-xs text-white/60 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="space-y-3">
                <p className="text-sm text-white/70 font-semibold">Technology Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-xs font-semibold text-white/80
                      hover:bg-white/15 hover:border-white/40 transition-all duration-300 cursor-default
                      hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:translate-y-[-2px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-6 mt-auto">
                <a
                  href={project.liveUrl}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold rounded-lg
                  shadow-[0_12px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)]
                  hover:translate-y-[-4px] active:translate-y-[-1px] transition-all duration-300 text-sm
                  hover:scale-105"
                >
                  <ExternalLink size={18} />
                  Visit Site
                </a>
                <a
                  href={project.githubUrl}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-white/30 text-white font-bold rounded-lg
                  hover:border-white hover:bg-white/10 shadow-[0_8px_20px_rgba(255,255,255,0.1)]
                  hover:shadow-[0_16px_40px_rgba(255,255,255,0.2)] hover:translate-y-[-4px] active:translate-y-[-1px]
                  transition-all duration-300 text-sm"
                >
                  <Github size={18} />
                  Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
        }

        @keyframes clockTick {
          from {
            transform: rotate(-90deg);
          }
          to {
            transform: rotate(-90deg);
          }
        }
      `}</style>
    </>
  )
}
