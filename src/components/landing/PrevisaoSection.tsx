'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '@/components/ui/badge'
import { useMobileScrollAnimation } from '@/lib/useMobileScrollAnimation'
import { prefereMenosMovimento } from '@/lib/movimento'
import { Bell, CalendarClock, CloudSun, Sun, Umbrella, Wind } from 'lucide-react'
import IconeModalidade from './IconeModalidade'

gsap.registerPlugin(ScrollTrigger)

/**
 * A previsão do tempo no jogo (épico api#580, landing#101).
 *
 * Quinta seção de profundidade, depois das quatro da #63. Tem seção, e não card,
 * pela regra que a `FeaturesSection` já escreve: card de um parágrafo é para o
 * que não tem seção. A previsão aparece em três telas e tem o aviso no sino.
 *
 * É também a funcionalidade que melhor conta o produto como **multiesporte**: o
 * risco muda com a modalidade. Vento forte estraga beach tennis e peteca muito
 * antes de incomodar um futsal, e o exemplo do visual é de areia por isso.
 *
 * O que a copy afirma, e onde isso vive em produção:
 *
 * - **na partida, no day use e no campeonato** — web#476 (`PrevisaoDoTempo`, o
 *   `SeloDoTempo` nos cartões de day use, `PrevisaoDosDias` no torneio);
 * - **hora a hora até dois dias antes, e a do dia até dez** — `alcanceDoIntervalo`
 *   na api#583: 48 horas por hora, 10 dias pela previsão diária;
 * - **o risco por esporte, com o motivo** — `ESPORTES_DE_VENTO` e os limiares da
 *   `leitura.ts` (api#583), só na api;
 * - **o sino na véspera e perto do jogo, e quando melhora** — o job
 *   `avisaPrevisaoRuim` (api#584). O aviso da partida vai para quem joga e para
 *   quem organiza; por isso a copy não promete aviso a "todo mundo";
 * - **quadra coberta sai da previsão, e a agenda do dono tem o tempo** — web#477.
 *
 * **Sem número de limiar no texto.** "30% de chuva" ou "rajada de 45 km/h" mudam
 * na api sem passar por aqui — mesma regra do raio na `PertoSection`.
 */
const pontos = [
  {
    Icon: CalendarClock,
    titulo: 'O tempo daquele lugar, naquele horário',
    texto:
      'A partida, o day use e o campeonato mostram a previsão da quadra onde vai ser o jogo: hora a hora até dois dias antes, e a previsão do dia até dez dias antes.',
  },
  {
    Icon: Wind,
    titulo: 'O risco depende do esporte',
    texto:
      'Vento forte estraga o beach tennis, o futevôlei, o tênis e a peteca muito antes de incomodar o futsal. Raio é risco para qualquer um. A tela diz o motivo, e não só uma cor.',
  },
  {
    Icon: Bell,
    titulo: 'O sino avisa antes',
    texto:
      'Na véspera e perto do jogo, quem vai jogar e quem organiza recebem o aviso se a previsão ficar ruim — e outro quando ela melhora.',
  },
  {
    Icon: Umbrella,
    titulo: 'Quadra coberta não recebe alarme à toa',
    texto:
      'O dono marca as quadras cobertas, e elas saem da previsão. Na agenda do dia, ele vê o tempo hora a hora das descobertas.',
  },
]

/** O desenho da faixa de horas. É exemplo, e não dado: ver o `aria-hidden` do visual. */
const horas = [
  // Ícone lucide, e não emoji (web#511): ☀️, 💨 e ⛅ eram fonte, e cada sistema
  // desenhava o seu.
  { hora: '15h', Icone: Sun,      graus: '29°', chuva: '10%', risco: false },
  { hora: '16h', Icone: Wind,     graus: '27°', chuva: '10%', risco: true },
  { hora: '17h', Icone: CloudSun, graus: '26°', chuva: '20%', risco: false },
]

export default function PrevisaoSection() {
  const sectionRef = useMobileScrollAnimation('.previsao-title, .previsao-ponto, .previsao-visual', { staggerMs: 80 })

  useEffect(() => {
    // O celular anima pelo IntersectionObserver; menos movimento, por nenhum.
    if (window.matchMedia('(max-width: 767px)').matches || prefereMenosMovimento()) return

    const title = sectionRef.current?.querySelector('.previsao-title')
    const pontosEl = sectionRef.current?.querySelectorAll('.previsao-ponto')
    const visual = sectionRef.current?.querySelector('.previsao-visual')

    if (title) gsap.set(title, { autoAlpha: 0, y: 30 })
    if (pontosEl?.length) gsap.set(Array.from(pontosEl), { autoAlpha: 0, x: -40 })
    if (visual) gsap.set(visual, { autoAlpha: 0, scale: 0.92 })

    const ctx = gsap.context(() => {
      if (title) gsap.to(title, {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      if (pontosEl?.length) gsap.to(Array.from(pontosEl), {
        autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      if (visual) gsap.to(visual, {
        autoAlpha: 1, scale: 1, duration: 0.9, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [sectionRef])

  return (
    <section id="previsao" ref={sectionRef} className="bg-gray-900/60 py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="previsao-title text-center mb-10 md:mb-14">
          <Badge variant="dark" className="mb-4">Previsão do tempo</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Vai chover no jogo?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Você sabe antes de sair
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A previsão fica na página da partida, do day use e do campeonato, lida para a modalidade
            de cada um. E o sino avisa quando o tempo vira.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            {pontos.map(({ Icon, titulo, texto }) => (
              <div key={titulo} className="previsao-ponto flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{titulo}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{texto}</p>
                </div>
              </div>
            ))}
          </div>

          {/*
            Visual leve, como o cartão de time e os anéis de distância: a forma de
            uma partida com a faixa de horas e o aviso do sino. Os números são
            desenho, e por isso o bloco inteiro é `aria-hidden`.
          */}
          <div className="previsao-visual flex justify-center" aria-hidden="true">
            <div className="relative w-full max-w-sm">
              <div className="rounded-2xl border border-white/10 bg-gray-950/60 p-6 shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-bold">Beach Tennis de Sábado</p>
                    <p className="text-gray-400 text-xs">Arena de Areia · Sáb 15h às 17h</p>
                  </div>
                  <IconeModalidade icon="beach-tennis" tamanho={26} />
                </div>

                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Previsão do tempo
                </p>
                <div className="mb-3 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-300 flex items-center gap-2">
                  <Wind size={16} className="flex-shrink-0" /> Risco de vento forte às 16h
                </div>
                <div className="flex gap-2">
                  {horas.map(({ hora, Icone, graus, chuva, risco }) => (
                    <div
                      key={hora}
                      className={`flex-1 flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2 ${
                        risco ? 'border-red-400/70 bg-red-500/5' : 'border-white/10 bg-gray-900'
                      }`}
                    >
                      <span className="text-xs text-gray-400">{hora}</span>
                      <Icone size={18} className={risco ? 'text-red-300' : 'text-gray-300'} />
                      <span className="text-sm font-bold text-white">{graus}</span>
                      <span className="text-xs text-gray-400">{chuva}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-float absolute -bottom-12 -left-4 md:-left-10 max-w-[260px] rounded-2xl border border-green-500/30 bg-gray-800 px-4 py-3 shadow-xl">
                <p className="flex items-center gap-2 text-white text-xs font-semibold">
                  <Bell size={13} className="text-green-400" /> Previsão de vento forte
                </p>
                <p className="text-gray-400 text-xs mt-0.5">para sua partida amanhã às 16h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
