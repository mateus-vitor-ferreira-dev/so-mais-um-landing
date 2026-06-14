'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '@/components/ui/badge'
import { useMobileScrollAnimation } from '@/lib/useMobileScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '🎯',
    title: 'Encontre e entre em peladas',
    description:
      'Veja partidas abertas com vagas, horário, quadra e valor. Entre com um clique — sem grupo de WhatsApp, sem planilha, sem confusão.',
    highlight: 'Zero burocracia',
  },
  {
    icon: '🎲',
    title: 'Sorteio automático de times',
    description:
      'O organizador sorteia os times com algoritmo Fisher-Yates: distribuição aleatória, grupos equilibrados, diferença máxima de 1 jogador entre times.',
    highlight: 'Times justos',
  },
  {
    icon: '⭐',
    title: 'Avaliações com tags e badges',
    description:
      'Avalie jogadores com estrelas (1–5) e tags como CRAQUE_DA_PELADA, FAIR_PLAY e PONTUAL. Badges como Confiável e Craque são conquistados automaticamente.',
    highlight: 'Reputação real',
  },
  {
    icon: '🔔',
    title: 'Notificações em tempo real',
    description:
      'Seja avisado na hora quando alguém entra, a pelada lota ou é cancelada. Conexão SSE persistente — sem recarregar a página, sem polling.',
    highlight: 'Ao vivo',
  },
  {
    icon: '🏆',
    title: 'Torneios completos',
    description:
      'Crie campeonatos com formato (league, knockout, grupos+mata-mata, suíço), divisões por nível e controle de inscrições. Para o OWNER gerir seus espaços.',
    highlight: 'Campeonatos',
  },
  {
    icon: '📊',
    title: 'Perfil e histórico',
    description:
      'Consulte peladas criadas, participadas e avaliações recebidas. Seu perfil público mostra badge, média de estrelas e estatísticas de presença.',
    highlight: 'Histórico completo',
  },
]

export default function FeaturesSection() {
  const sectionRef = useMobileScrollAnimation('.features-title, .feature-card', { staggerMs: 100 })

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.features-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="bg-white py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="features-title text-center mb-8 md:mb-16">
          <Badge className="mb-4">Funcionalidades</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Do racha ao torneio —{' '}
            <span className="text-green-500">tudo num lugar só</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Só+1 cobre o ciclo completo: descobrir pelada, entrar, sortear times, jogar, avaliar e construir reputação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="feature-card group bg-gray-50 hover:bg-white border border-gray-100 hover:border-green-100 hover:shadow-xl hover:shadow-green-500/5 rounded-3xl p-8 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900">{feat.title}</h3>
              </div>
              <span className="inline-block text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100 mb-3">
                {feat.highlight}
              </span>
              <p className="text-gray-500 leading-relaxed text-sm">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
