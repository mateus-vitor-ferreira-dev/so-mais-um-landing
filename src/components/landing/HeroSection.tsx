'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Trophy, Users } from 'lucide-react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const fieldLinesRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = fieldLinesRef.current?.querySelectorAll('path, circle, line')
      if (paths) {
        paths.forEach((path) => {
          const length = (path as SVGGeometryElement).getTotalLength?.() ?? 300
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        })
        gsap.to(Array.from(paths), {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.15,
          ease: 'power2.inOut',
          delay: 0.3,
        })
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(cardRef.current, { y: 60, opacity: 0, duration: 1, ease: 'back.out(1.2)' })
      tl.from(
        [badgeRef.current, headlineRef.current, subRef.current, ctaRef.current],
        { y: 40, opacity: 0, duration: 0.7, stagger: 0.15 },
        '-=0.6'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-gray-950 min-h-[70vh] md:min-h-screen"
    >
      <svg
        ref={fieldLinesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <circle cx="600" cy="350" r="120" stroke="#22c55e" strokeWidth="1.5" opacity="0.15" />
        <circle cx="600" cy="350" r="6" stroke="#22c55e" strokeWidth="2" opacity="0.2" />
        <line x1="600" y1="0" x2="600" y2="700" stroke="#22c55e" strokeWidth="1.5" opacity="0.1" />
        <path d="M80 60 H1120 V640 H80 Z" stroke="#22c55e" strokeWidth="1.5" opacity="0.1" />
        <path d="M80 260 H200 V440 H80" stroke="#22c55e" strokeWidth="1.5" opacity="0.08" />
        <path d="M1120 260 H1000 V440 H1120" stroke="#22c55e" strokeWidth="1.5" opacity="0.08" />
        <circle cx="230" cy="350" r="4" fill="#22c55e" opacity="0.15" />
        <circle cx="970" cy="350" r="4" fill="#22c55e" opacity="0.15" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(34,197,94,0.07),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-10 md:pt-24 md:pb-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text side */}
        <div>
          <div ref={badgeRef}>
            <Badge variant="dark" className="mb-6 text-sm px-4 py-1.5">
              🚀 Plataforma gratuita para jogadores
            </Badge>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
          >
            A pelada que falta{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              sempre tem vaga
            </span>{' '}
            pra você
          </h1>

          <p ref={subRef} className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
            Encontre partidas abertas, entre com um clique, sorteie os times e avalie os jogadores. Do racha da várzea ao torneio organizado — tudo em um lugar.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a href="https://app.so-mais-um.com/register">
              <Button size="xl" className="group">
                Entrar na próxima pelada
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button variant="ghost" size="xl" className="text-gray-300 hover:text-white">
                Como funciona
              </Button>
            </a>
          </div>
        </div>

        {/* Card side */}
        <div ref={cardRef} className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            {/* Main card */}
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pelada aberta</p>
                  <h3 className="text-white font-bold text-lg">Society da Quinta</h3>
                </div>
                <span className="text-3xl">⚽</span>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-base">📅</span>
                  Quinta-feira, 19h
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-base">📍</span>
                  Quadra Arena Sul
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-base">💰</span>
                  R$ 30 por pessoa · Pix
                </div>
              </div>

              {/* Vagas */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Vagas preenchidas</span>
                  <span className="text-green-400 font-semibold">8 / 12</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '66%' }} />
                </div>
              </div>

              <Button className="w-full" size="sm">
                Entrar na pelada
              </Button>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-gray-800 border border-green-500/30 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-white text-sm font-semibold">Torneios</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gray-800 border border-green-500/30 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
              <Star size={14} className="text-green-400 fill-green-400" />
              <Star size={14} className="text-green-400 fill-green-400" />
              <Star size={14} className="text-green-400 fill-green-400" />
              <Star size={14} className="text-green-400 fill-green-400" />
              <Star size={14} className="text-green-400 fill-green-400" />
              <span className="text-white text-sm font-semibold ml-1">Craque da Pelada</span>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 bg-gray-800 border border-white/10 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
              <Users size={14} className="text-blue-400" />
              <span className="text-white text-xs font-semibold">11 modalidades</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  )
}
