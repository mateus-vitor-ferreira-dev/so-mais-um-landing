'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '@/components/ui/badge'
import { useMobileScrollAnimation } from '@/lib/useMobileScrollAnimation'
import { prefereMenosMovimento } from '@/lib/movimento'
import type { Sport } from '@/lib/sports'
import IconeModalidade from './IconeModalidade'

gsap.registerPlugin(ScrollTrigger)

interface Decoracao {
  color: string
  from: { x: number; y: number }
}

const DECORACAO: Record<string, Decoracao> = {
  FUTSAL: { color: 'from-blue-600 to-blue-800', from: { x: -100, y: 0 } },
  SOCIETY: { color: 'from-green-600 to-green-800', from: { x: 0, y: -80 } },
  CAMPO: { color: 'from-emerald-600 to-emerald-800', from: { x: 100, y: 0 } },
  BASQUETE: { color: 'from-orange-600 to-red-700', from: { x: -100, y: 0 } },
  VOLEI: { color: 'from-yellow-500 to-yellow-700', from: { x: 0, y: 80 } },
  BEACH_TENNIS: { color: 'from-lime-500 to-lime-700', from: { x: 100, y: 0 } },
  AREIA: { color: 'from-orange-500 to-orange-700', from: { x: -100, y: 0 } },
  POKER: { color: 'from-purple-600 to-purple-800', from: { x: 0, y: -80 } },
  TENIS: { color: 'from-violet-500 to-violet-700', from: { x: 100, y: 0 } },
  HANDBALL: { color: 'from-red-500 to-red-700', from: { x: -100, y: 0 } },
  VOLEI_AREIA: { color: 'from-cyan-500 to-cyan-700', from: { x: 0, y: 80 } },
  PETECA: { color: 'from-pink-500 to-pink-700', from: { x: 100, y: 0 } },
}

const DECORACAO_PADRAO: Decoracao = { color: 'from-green-600 to-green-800', from: { x: 0, y: 0 } }

export default function CourtsSection({ sports }: { sports: Sport[] }) {
  const sectionRef = useMobileScrollAnimation('.courts-title, .sport-card', { staggerMs: 80 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(min-width: 768px)').matches && !prefereMenosMovimento()) {
        const cards = sectionRef.current?.querySelectorAll('.sport-card')
        cards?.forEach((card, i) => {
          const dir = (DECORACAO[sports[i].id] ?? DECORACAO_PADRAO).from
          gsap.from(card, {
            x: dir.x,
            y: dir.y,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          })
        })
        gsap.from('.courts-title', {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [sectionRef, sports])

  return (
    <section id="courts" ref={sectionRef} className="relative bg-gray-950/60 py-12 md:py-24 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(34,197,94,0.06),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="courts-title text-center mb-8 md:mb-16">
          <Badge variant="dark" className="mb-4">Modalidades</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            12 modalidades,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              uma plataforma
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Beach tennis, vôlei, futsal, peteca, basquete, tênis e até poker — organize qualquer tipo de partida ou campeonato.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sports.map((sport) => {
            const decoracao = DECORACAO[sport.id] ?? DECORACAO_PADRAO
            return (
            <div
              key={sport.id}
              className="sport-card group relative bg-gray-900 border border-white/10 hover:border-green-500/40 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${decoracao.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
              <div className="relative z-10">
                {/*
                  O desenho vem do `icon` da api, e não do `iconFallback`: o
                  emoji era fonte, e cada sistema desenhava o seu (web#511). A
                  caixa de 36px é a que o emoji ocupava, para os títulos não
                  subirem.
                */}
                <span className="group-hover:scale-110 transition-transform duration-300 inline-flex h-9 items-center mb-3">
                  <IconeModalidade icon={sport.icon} />
                </span>
                <h3 className="text-base font-bold text-white mb-1">{sport.label}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{sport.description}</p>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${decoracao.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
