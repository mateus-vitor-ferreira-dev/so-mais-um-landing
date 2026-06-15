'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { useMobileScrollAnimation } from '@/lib/useMobileScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '847+', label: 'jogadores', icon: '🏃' },
  { value: '32',   label: 'peladas hoje', icon: '⚽' },
  { value: '5',    label: 'cidades', icon: '🌎' },
]

const testimonials = [
  {
    name: 'Lucas M.',
    city: 'Lavras, MG',
    sport: 'Society',
    text: 'Encontrei um racha de society na hora que queria jogar. Entrei, joguei, fiz amigos novos. Nunca foi tão fácil.',
    initials: 'LM',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Rafael T.',
    city: 'Lavras, MG',
    sport: 'Futsal',
    text: 'O sorteio de times é ótimo. Todo mundo aceita porque foi automático — sem aquela discussão chata de sempre.',
    initials: 'RT',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Ana S.',
    city: 'Três Corações, MG',
    sport: 'Beach Tennis',
    text: 'Criei a primeira pelada em 2 minutos. Nunca mais precisei de grupo de WhatsApp para organizar.',
    initials: 'AS',
    gradient: 'from-purple-500 to-purple-600',
  },
]

export default function SocialProofSection() {
  const sectionRef = useMobileScrollAnimation('.sp-stat, .sp-card', { staggerMs: 100 })

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.sp-stat', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
      })
      gsap.from('.sp-card', {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.1)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-900 py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 md:mb-16">
          {stats.map((s, i) => (
            <div key={i} className="sp-stat flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <span className="text-2xl font-black text-white">{s.value} </span>
                <span className="text-gray-500 text-sm">{s.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-6 bg-white/10 ml-6 md:ml-12" />
              )}
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="sp-card group bg-gray-800/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-black text-white flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.city} · {t.sport}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
