'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMobileScrollAnimation } from '@/lib/useMobileScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { value: '26+', label: 'Arenas parceiras em Lavras', icon: '🏟️' },
  { value: '12',  label: 'Modalidades suportadas',     icon: '🏅' },
  { value: '100%', label: 'Gratuito para jogadores',   icon: '🆓' },
]

export default function StatsSection() {
  const sectionRef = useMobileScrollAnimation('.stat-card', { staggerMs: 120 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        gsap.from('.stat-card', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gray-950 py-8 md:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(34,197,94,0.04),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="stat-card group relative bg-gray-900/60 border border-white/5 hover:border-green-500/20 rounded-2xl p-8 flex items-center gap-6 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/[0.03] pointer-events-none" />
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              <div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                  {item.value}
                </div>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
