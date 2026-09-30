import { useEffect } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'

import Scene from './three/Scene'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Snapshot from './components/Snapshot'
import Services from './components/Services'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import RnD from './components/RnD'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

import { pointerState, prefersReducedMotion, scrollState } from './lib/state'

export default function App() {
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  /* Smooth scroll + feed the r3f loop with scroll/pointer values. */
  useEffect(() => {
    let lenis
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        // lerp is cheaper and more predictable than duration-based easing
        lerp: 0.1,
        smoothWheel: true,
        // native scrolling on touch: smoothing there costs more than it gives
        syncTouch: false,
        wheelMultiplier: 1,
      })
      const raf = (time) => {
        lenis.raf(time)
        id = requestAnimationFrame(raf)
      }
      let id = requestAnimationFrame(raf)
      var cancel = () => cancelAnimationFrame(id)
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollState.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      scrollState.hero = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
    }

    const onPointer = (e) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerState.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onPointer)
      if (cancel) cancel()
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="noise relative min-h-screen">
      <Loader />
      <Scene />
      <Cursor />

      {/* readability veil over the 3D background for the content half of the page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[5]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(4,5,10,0.62) 52%, rgba(4,5,10,0.86) 78%, rgba(4,5,10,0.9) 100%)',
        }}
      />

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: bar }}
        className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink"
      />

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Snapshot />
        <About />
        <Services />
        <Projects />
        <RnD />
        <Experience />
        <Skills />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
