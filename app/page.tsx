"use client"

import { useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import WorkShowcase from "@/components/work-showcase"
import Testimonials from "@/components/testimonials"
import Experience from "@/components/experience"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <WorkShowcase />
        <Testimonials />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
