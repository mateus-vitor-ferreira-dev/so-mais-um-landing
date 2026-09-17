'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMobileScrollAnimation } from '@/lib/useMobileScrollAnimation'
import { prefereMenosMovimento } from '@/lib/movimento'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useMobileScrollAnimation('.cta-content')

  useEffect(() => {
    // O celular anima pelo IntersectionObserver; menos movimento, por nenhum.
    if (window.matchMedia('(max-width: 767px)').matches || prefereMenosMovimento()) return

    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [sectionRef])

  return (
    <section ref={sectionRef} className="bg-gray-950/60 py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center cta-content">
        {/*
          O verde desceu um degrau (web#511): o título branco dava 2,5:1 no canto
          emerald-500, abaixo dos 3:1 de texto grande, e o parágrafo em
          green-100/80 ficava perto disso. O texto passa a branco cheio. Do green-800 ao emerald-800, o branco
          passa de 4,5:1 em toda a faixa, medido na captura.
        */}
        <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 rounded-3xl px-6 py-10 sm:p-10 md:p-20 overflow-hidden shadow-2xl shadow-green-500/25">
          {/* Field SVG overlay */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
            viewBox="0 0 600 300"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <circle cx="300" cy="150" r="80" stroke="white" strokeWidth="2" />
            <line x1="300" y1="0" x2="300" y2="300" stroke="white" strokeWidth="1.5" />
            <path d="M20 20 H580 V280 H20 Z" stroke="white" strokeWidth="2" />
            <path d="M20 110 H100 V190 H20" stroke="white" strokeWidth="1.5" />
            <path d="M580 110 H500 V190 H580" stroke="white" strokeWidth="1.5" />
          </svg>

          {/* Glow orbs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Animated trophy */}
            <div className="animate-float-slow inline-block mb-4">
              <Trophy size={48} strokeWidth={1.75} className="text-yellow-300" aria-hidden="true" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Sua próxima partida começa aqui
            </h2>
            <p className="text-white text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Crie sua conta gratuita e encontre uma partida hoje. Times sorteados, vagas controladas, reputação garantida.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <a
                href="https://app.so-mais-um.com/register"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'xl' }),
                  'group font-bold bg-white text-green-700 hover:bg-white/90 btn-shimmer w-full px-6 sm:w-auto sm:px-10',
                )}
              >
                Criar conta gratuita
                <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
              </a>
              {/* 44px de altura de toque, e texto cheio: o green-100/70 não se lia sobre o verde. */}
              <a
                href="https://app.so-mais-um.com/login"
                className="inline-flex min-h-11 items-center px-3 text-white hover:text-green-50 text-sm font-medium transition-colors underline underline-offset-4"
              >
                Já tenho conta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
