'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: '+', label: 'Jogadores cadastrados', icon: '👟' },
  { value: 200, suffix: '+', label: 'Peladas organizadas', icon: '⚽' },
  { value: 50,  suffix: '+', label: 'Espaços parceiros',   icon: '🏟️' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stats[i].value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val).toString() },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      })

      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card bg-gray-800/50 border border-white/5 rounded-2xl p-8 flex items-center gap-6"
            >
              <span className="text-4xl">{stat.icon}</span>
              <div>
                <div className="text-4xl font-black text-white">
                  <span ref={(el) => { countersRef.current[i] = el }}>0</span>
                  <span className="text-green-400">{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
