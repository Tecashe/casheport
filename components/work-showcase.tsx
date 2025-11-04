"use client"

import { useEffect, useRef, useState } from "react"
import { Grid3x3, Play } from "lucide-react"
import { ProjectModal } from "@/components/project-modal"

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

const projects: Project[] = [
  {
    id: 1,
    featured: true,
    category: "Web Application",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
    longDescription:
      "A comprehensive e-commerce platform built with React and Node.js featuring real-time inventory management, seamless payment processing, and advanced analytics.",
    image: "/ecommerce-product-listing.jpg",
    liveUrl: "https://example-store.com",
    githubUrl: "https://github.com",
    tech: ["React", "Vite", "Tailwind", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Users", value: "10K+" },
      { label: "Performance", value: "98/100" },
      { label: "Uptime", value: "99.9%" },
    ],
    images: ["/ecommerce-product-listing.jpg", "/ecommerce-checkout.png", "/placeholder-ai-content.jpg"],
  },
  {
    id: 2,
    featured: false,
    category: "Mobile App",
    title: "Fitness Tracking App",
    description: "Cross-platform fitness app with real-time tracking, social features, and AI-powered recommendations.",
    longDescription:
      "Mobile-first fitness tracking application with real-time workout monitoring, social engagement features, and machine learning powered workout recommendations.",
    image: "/fitness-app-dashboard.png",
    liveUrl: "https://example-fitness.com",
    githubUrl: "https://github.com",
    tech: ["React Native", "Firebase", "Redux"],
    images: ["/fitness-app-dashboard.png", "/fitness-workout-tracking.jpg", "/placeholder-email-marketing.jpg"],
  },
  {
    id: 3,
    featured: false,
    category: "SaaS Platform",
    title: "Project Management Tool",
    description: "Collaborative platform with real-time updates, file sharing, and advanced team analytics.",
    longDescription:
      "Enterprise-grade project management solution with real-time collaboration, file sharing capabilities, and comprehensive team analytics dashboards.",
    image: "/project-management-dashboard.png",
    liveUrl: "https://example-pm.com",
    githubUrl: "https://github.com",
    tech: ["React", "GraphQL", "MongoDB", "Socket.io"],
    images: [
      "/project-management-dashboard.png",
      "/project-timeline-gantt-chart.png",
      "/placeholder-video-streaming.jpg",
    ],
  },
  {
    id: 4,
    featured: false,
    category: "Data Visualization",
    title: "Analytics Dashboard",
    description: "Real-time analytics with custom charts, data filtering, and comprehensive export capabilities.",
    longDescription:
      "Advanced analytics dashboard featuring real-time data visualization, customizable charts, powerful filtering options, and multi-format data exports.",
    image: "/analytics-dashboard-charts.png",
    liveUrl: "https://example-analytics.com",
    githubUrl: "https://github.com",
    tech: ["React", "D3.js", "Recharts", "Node.js"],
    images: ["/analytics-dashboard-charts.png", "/analytics-data-visualization.jpg", "/placeholder-real-estate.jpg"],
  },
  {
    id: 5,
    featured: false,
    category: "Mobile App",
    title: "Social Network Platform",
    description: "Feature-rich social platform with real-time messaging, notifications, and feed optimization.",
    longDescription:
      "Full-featured social networking platform with real-time messaging, push notifications, AI-powered feed optimization, and community features.",
    image: "/social-network-feed.jpg",
    liveUrl: "https://example-social.com",
    githubUrl: "https://github.com",
    tech: ["React Native", "GraphQL", "Firebase", "Redux"],
    images: ["/social-network-feed.jpg", "/social-messaging-interface.jpg", "/placeholder-lms.jpg"],
  },
  {
    id: 6,
    featured: false,
    category: "Design System",
    title: "Component Library",
    description: "Comprehensive design system with 50+ reusable components and extensive documentation.",
    longDescription:
      "Extensive component library with 50+ production-ready components, detailed Storybook documentation, and comprehensive accessibility features.",
    image: "/component-library-storybook.jpg",
    liveUrl: "https://example-components.com",
    githubUrl: "https://github.com",
    tech: ["React", "Storybook", "Tailwind", "TypeScript"],
    images: ["/component-library-storybook.jpg", "/design-system-components.png", "/placeholder-delivery.jpg"],
  },
  {
    id: 7,
    featured: false,
    category: "AI/ML",
    title: "AI Content Generator",
    description: "Intelligent content generation platform powered by advanced language models.",
    longDescription:
      "AI-powered content generation platform using state-of-the-art language models for creating high-quality, contextual content at scale.",
    image: "/ai-content-generator-interface.png",
    liveUrl: "https://example-ai.com",
    githubUrl: "https://github.com",
    tech: ["React", "OpenAI API", "Node.js", "TypeScript"],
    images: ["/ai-content-generator-interface.png", "/ai-writing-assistant.jpg", "/placeholder-bi.jpg"],
  },
  {
    id: 8,
    featured: false,
    category: "CMS",
    title: "Content Management System",
    description: "Headless CMS with powerful content modeling and API-first architecture.",
    longDescription:
      "Modern headless CMS with flexible content modeling, powerful API-first architecture, and comprehensive content versioning capabilities.",
    image: "/content-management-system.png",
    liveUrl: "https://example-cms.com",
    githubUrl: "https://github.com",
    tech: ["Next.js", "GraphQL", "MongoDB", "TypeScript"],
    images: ["/content-management-system.png", "/placeholder-design-tool.jpg", "/placeholder-ai-content.jpg"],
  },
  {
    id: 9,
    featured: false,
    category: "Marketing",
    title: "Email Marketing Platform",
    description: "Full-featured email marketing solution with automation and analytics.",
    longDescription:
      "Comprehensive email marketing platform with drag-and-drop builder, marketing automation, advanced segmentation, and detailed analytics.",
    image: "/email-marketing-dashboard.png",
    liveUrl: "https://example-email.com",
    githubUrl: "https://github.com",
    tech: ["React", "Node.js", "PostgreSQL", "Redis"],
    images: ["/email-marketing-dashboard.png", "/email-builder-drag-and-drop.jpg", "/email-analytics-reports.jpg"],
  },
  {
    id: 10,
    featured: false,
    category: "Streaming",
    title: "Video Streaming Platform",
    description: "Scalable video streaming service with adaptive bitrate and live streaming.",
    longDescription:
      "High-performance video streaming platform with adaptive bitrate streaming, live streaming capabilities, and multi-device support.",
    image: "/video-streaming-platform.jpg",
    liveUrl: "https://example-video.com",
    githubUrl: "https://github.com",
    tech: ["React", "Node.js", "WebRTC", "HLS"],
    images: ["/video-streaming-platform.jpg", "/video-player-interface.jpg", "/video-recommendations-feed.jpg"],
  },
  {
    id: 11,
    featured: false,
    category: "Real Estate",
    title: "Real Estate Portal",
    description: "Modern real estate marketplace with virtual tours and property analytics.",
    longDescription:
      "Comprehensive real estate platform featuring 3D virtual property tours, advanced search filters, and detailed property analytics.",
    image: "/real-estate-portal-listings.jpg",
    liveUrl: "https://example-realestate.com",
    githubUrl: "https://github.com",
    tech: ["React", "Three.js", "Node.js", "PostgreSQL"],
    images: ["/real-estate-portal-listings.jpg", "/virtual-property-tour.jpg", "/real-estate-agent-dashboard.jpg"],
  },
  {
    id: 12,
    featured: false,
    category: "Education",
    title: "Learning Management System",
    description: "Comprehensive LMS with interactive courses and student progress tracking.",
    longDescription:
      "Full-featured learning management system with interactive course creation, real-time progress tracking, and adaptive learning paths.",
    image: "/learning-management-system.png",
    liveUrl: "https://example-lms.com",
    githubUrl: "https://github.com",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    images: ["/learning-management-system.png", "/course-creation-interface.png", "/student-progress-dashboard.png"],
  },
  {
    id: 13,
    featured: false,
    category: "Logistics",
    title: "Delivery Tracking System",
    description: "Real-time delivery tracking with route optimization and driver management.",
    longDescription:
      "Advanced logistics platform with real-time GPS tracking, intelligent route optimization, and comprehensive driver management tools.",
    image: "/delivery-tracking-map.jpg",
    liveUrl: "https://example-delivery.com",
    githubUrl: "https://github.com",
    tech: ["React", "Node.js", "Google Maps API", "Socket.io"],
    images: ["/delivery-tracking-map.jpg", "/delivery-driver-app.jpg", "/delivery-status-tracking.jpg"],
  },
  {
    id: 14,
    featured: false,
    category: "Business Intelligence",
    title: "BI Dashboard Suite",
    description: "Enterprise business intelligence platform with advanced data analytics.",
    longDescription:
      "Enterprise-grade BI platform with advanced data analytics, custom report generation, and predictive analytics capabilities.",
    image: "/placeholder-bi.jpg",
    liveUrl: "https://example-bi.com",
    githubUrl: "https://github.com",
    tech: ["React", "D3.js", "Python", "PostgreSQL"],
    images: ["/placeholder-bi.jpg", "/analytics-dashboard-charts.png", "/analytics-data-visualization.jpg"],
  },
  {
    id: 15,
    featured: false,
    category: "Design Tools",
    title: "Collaborative Design Tool",
    description: "Real-time collaborative design platform for teams with version control.",
    longDescription:
      "Web-based collaborative design platform with real-time synchronization, version control, comment threads, and team workspaces.",
    image: "/placeholder-design-tool.jpg",
    liveUrl: "https://example-design.com",
    githubUrl: "https://github.com",
    tech: ["React", "Canvas API", "Socket.io", "Node.js"],
    images: ["/placeholder-design-tool.jpg", "/placeholder-devops.jpg", "/design-system-components.png"],
  },
]

function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h3 className="text-4xl font-bold text-white mb-3">Complete Project Portfolio</h3>
          <div className="flex items-center gap-3">
            <Grid3x3 size={20} className="text-white" />
            <p className="text-white/60 text-sm">All {projects.filter((p) => !p.featured).length} projects</p>
          </div>
        </div>

        {/* Responsive grid with hover effects */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="text-left group"
                  style={{
                    animation: `slideInUp 0.6s ease-out forwards`,
                    animationDelay: `${idx * 100}ms`,
                    opacity: 0,
                  }}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/60 
                    transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
                    hover:translate-y-[-12px] will-change-transform cursor-pointer"
                  >
                    {/* Image container */}
                    <div className="relative h-64 overflow-hidden perspective">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                      {/* Preview badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div
                          className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center 
                          shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.5)]
                          hover:scale-110 transition-all duration-300 cursor-pointer
                          hover:bg-white/10 backdrop-blur-sm"
                        >
                          <Play size={24} className="text-white fill-white ml-1" />
                        </div>
                      </div>

                      {/* Category badge */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold text-white/90
                        shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                        group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-300
                        group-hover:translate-y-[-4px]"
                      >
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h4 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-white/60 px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 
                            hover:bg-white/10 hover:border-white/30 hover:text-white/90
                            transition-all duration-300 cursor-default
                            hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)]
                            hover:translate-y-[-2px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Quick CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(project)
                        }}
                        className="w-full mt-3 px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg
                        transition-all duration-300 text-sm
                        shadow-[0_4px_12px_rgba(255,255,255,0.1)]
                        hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)]
                        hover:translate-y-[-2px]"
                      >
                        Preview Project
                      </button>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Project Modl */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} allProjects={projects} />

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  )
}

function ProjectSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (projects.length - 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  return <div className="relative py-20"></div>
}

function FeaturedProject({ project }: { project: Project }) {
  return <div className="relative py-20"></div>
}

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const featuredProject = projects.find((p) => p.featured)

  return (
    <section id="work" ref={sectionRef} className="relative bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <h2
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{
              animation: inView ? "fadeInUp 0.8s ease-out forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            Work Showcase
          </h2>
          <div
            className="w-24 h-1.5 bg-gradient-to-r from-white via-white/40 to-transparent rounded-full"
            style={{
              animation: inView ? "slideIn 1s ease-out 0.2s forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          />
        </div>

        {/* Featured Project */}
        {featuredProject && <FeaturedProject project={featuredProject} />}

        {/* Complete Project Grid */}
        <ProjectGrid />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 6rem;
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
      `}</style>
    </section>
  )
}
