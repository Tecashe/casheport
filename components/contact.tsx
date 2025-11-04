// "use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Mail, Linkedin, Github, Twitter, Send, Check, AlertCircle } from "lucide-react"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inView, setInView] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formState.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formState.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsLoading(false)

    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const socialLinks = [
    { icon: Mail, href: "mailto:simon@example.com", label: "Email", color: "hover:text-red-400" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-sky-400" },
  ]

  return (
    <section id="contact" ref={containerRef} className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-32 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{
            animation: inView ? "float 8s ease-in-out infinite" : "none",
          }}
        />
        <div
          className="absolute bottom-32 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          style={{
            animation: inView ? "float 10s ease-in-out infinite 1s" : "none",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{
              animation: inView ? "fadeInUp 0.8s ease-out forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            Get In Touch
          </h2>
          <p
            className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            style={{
              animation: inView ? "fadeInUp 0.8s ease-out 0.1s forwards" : "none",
              opacity: inView ? 1 : 0,
            }}
          >
            Have a project in mind? Let's collaborate and create something extraordinary together.
          </p>
        </div>

        <div
          ref={formRef}
          className="p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_30px_100px_rgba(255,255,255,0.1)] transition-all duration-500"
          style={{
            animation: inView ? "slideInUp 0.8s ease-out 0.2s forwards" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          {submitted ? (
            <div className="text-center py-16">
              <div
                className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
                style={{
                  animation: "bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
              >
                <Check size={40} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Thank You!</h3>
              <p className="text-white/60 text-lg">
                I'll get back to you as soon as possible. Looking forward to collaborating!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div
                style={{
                  animation: inView ? "slideInUp 0.6s ease-out 0.3s forwards" : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                <label className="block text-sm font-semibold mb-3 text-white">Name</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => {
                      setFormState({ ...formState, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    className={`w-full px-5 py-4 bg-black/50 backdrop-blur-sm rounded-lg text-white placeholder-white/30 border-2 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus:translate-y-[-2px] ${errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-white/60"}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                  )}
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.name}</p>}
              </div>

              {/* Email field */}
              <div
                style={{
                  animation: inView ? "slideInUp 0.6s ease-out 0.35s forwards" : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                <label className="block text-sm font-semibold mb-3 text-white">Email</label>
                <div className="relative group">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                    className={`w-full px-5 py-4 bg-black/50 backdrop-blur-sm rounded-lg text-white placeholder-white/30 border-2 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus:translate-y-[-2px] ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-white/60"}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                  )}
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.email}</p>}
              </div>

              {/* Subject field */}
              <div
                style={{
                  animation: inView ? "slideInUp 0.6s ease-out 0.4s forwards" : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                <label className="block text-sm font-semibold mb-3 text-white">Subject</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => {
                      setFormState({ ...formState, subject: e.target.value })
                      if (errors.subject) setErrors({ ...errors, subject: undefined })
                    }}
                    className={`w-full px-5 py-4 bg-black/50 backdrop-blur-sm rounded-lg text-white placeholder-white/30 border-2 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus:translate-y-[-2px] ${errors.subject ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-white/60"}`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                  )}
                </div>
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.subject}</p>
                )}
              </div>

              {/* Message field */}
              <div
                style={{
                  animation: inView ? "slideInUp 0.6s ease-out 0.45s forwards" : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                <label className="block text-sm font-semibold mb-3 text-white">Message</label>
                <div className="relative group">
                  <textarea
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: undefined })
                    }}
                    rows={6}
                    className={`w-full px-5 py-4 bg-black/50 backdrop-blur-sm rounded-lg text-white placeholder-white/30 border-2 transition-all duration-300 resize-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus:translate-y-[-2px] ${errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-white/60"}`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <div className="absolute right-4 top-4">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                  )}
                </div>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <div
                style={{
                  animation: inView ? "slideInUp 0.6s ease-out 0.5s forwards" : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-white text-black font-bold rounded-xl shadow-[0_12px_40px_rgba(255,255,255,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.35)] hover:translate-y-[-6px] active:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-700" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div
          className="flex justify-center gap-6 mt-16"
          style={{
            animation: inView ? "fadeInUp 0.8s ease-out 0.6s forwards" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          <p className="text-white/60 mr-4 flex items-center">Connect with me:</p>
          {socialLinks.map(({ icon: Icon, href, label, color }, idx) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/15 hover:border-white/60 ${color} shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(255,255,255,0.2)] hover:translate-y-[-6px] transition-all duration-300`}
              title={label}
              style={{
                animation: inView ? `slideInUp 0.6s ease-out ${0.65 + idx * 0.08}s forwards` : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              <Icon size={22} className="group-hover:scale-110 transition-transform" />
            </a>
          ))}
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
        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
