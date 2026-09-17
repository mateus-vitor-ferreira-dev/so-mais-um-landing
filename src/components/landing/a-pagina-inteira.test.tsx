/**
 * O que a página inteira diz, lida de ponta a ponta (landing#100).
 *
 * As outras suítes olham uma seção por vez, e é assim que a palavra velha
 * sobrevive: "pelada" saiu do produto em agosto e continuou em três seções da
 * landing, cada uma revisada sozinha, sem ninguém ler as dezessete em sequência.
 *
 * Este arquivo monta todas as seções juntas, com dados de exemplo, e confere o
 * **texto visível** — e não o código-fonte, onde a palavra aparece de propósito
 * em comentário que conta a história do rename.
 *
 * O GSAP fica de fora pelo mesmo motivo do `FAQSection.test.tsx`: sem scroll no
 * jsdom, o `autoAlpha` esconderia tudo da árvore.
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('gsap', () => {
  const gsap = {
    set: vi.fn(),
    to: vi.fn((_alvo: unknown, vars?: { onComplete?: () => void }) => {
      vars?.onComplete?.()
      return {}
    }),
    from: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({ from: vi.fn(), to: vi.fn() })),
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn()
      return { revert: vi.fn() }
    }),
  }
  return { gsap, default: gsap }
})
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))
// O layout carrega a fonte pelo `next/font`, que só existe no build do Next.
vi.mock('next/font/google', () => ({ Inter: () => ({ className: '', variable: '' }) }))

// O jsdom não mede SVG, e a linha do "Como funciona" pergunta o comprimento dela.
Object.defineProperty(SVGElement.prototype, 'getTotalLength', { value: () => 300, configurable: true })

import { metadata } from '@/app/layout'
import { FALLBACK_SPORTS } from '@/lib/sports'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import FeaturesSection from './FeaturesSection'
import AppPreviewSection from './AppPreviewSection'
import TimesSection from './TimesSection'
import AcessoSection from './AcessoSection'
import PertoSection from './PertoSection'
import PrevisaoSection from './PrevisaoSection'
import CampeonatosSection from './CampeonatosSection'
import HowItWorksSection from './HowItWorksSection'
import OwnerSection from './OwnerSection'
import EscolinhaEDayUseSection from './EscolinhaEDayUseSection'
import PlanosSection from './PlanosSection'
import CourtsSection from './CourtsSection'
import RoadmapSection from './RoadmapSection'
import FAQSection from './FAQSection'
import CTASection from './CTASection'
import Footer from './Footer'

function aPagina() {
  return render(
    <>
      <Navbar />
      <HeroSection />
      <StatsSection numeros={{ arenas: 26, jogadores: 128, matchesAbertas: 9, cidades: 4 }} />
      <FeaturesSection />
      <AppPreviewSection />
      <TimesSection />
      <AcessoSection />
      <PertoSection />
      <PrevisaoSection />
      <CampeonatosSection />
      <HowItWorksSection />
      <OwnerSection />
      <EscolinhaEDayUseSection />
      <PlanosSection
        grade={{ planos: [{ nome: 'Só+1 Básico', funcionalidades: [] }], parceiroUrl: 'https://app.so-mais-um.com/seja-parceiro' }}
      />
      <CourtsSection sports={FALLBACK_SPORTS} />
      <RoadmapSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>,
  )
}

describe('a página inteira', () => {
  it('não diz "pelada" nem "racha" em texto nenhum que o visitante lê', () => {
    const { container } = aPagina()
    const texto = container.textContent ?? ''

    expect(texto).not.toMatch(/pelada/i)
    expect(texto).not.toMatch(/\bracha\b/i)
  })

  it('a descrição que aparece no Google e no link colado também não', () => {
    // O `keywords` fica de fora de propósito: é termo de busca, e não copy (ver o layout).
    const descricoes = [metadata.description, metadata.openGraph?.description, metadata.twitter?.description]
    for (const descricao of descricoes) {
      expect(String(descricao ?? '')).not.toMatch(/pelada|\bracha\b/i)
    }
  })

  it('a primeira dobra fala de mais de uma família de esporte', () => {
    const { container } = aPagina()
    const hero = container.querySelector('h1')?.closest('section')?.textContent ?? ''

    // O futebol pode estar, mas não sozinho: a areia e a quadra de vôlei precisam aparecer.
    expect(hero).toMatch(/beach tennis/i)
    expect(hero).toMatch(/vôlei/i)
  })

  /**
   * O Tailwind 4 tirou o `cursor: pointer` do `<button>` no preflight, e o
   * botão sem classe mostra a seta: as oito perguntas do FAQ pareciam texto
   * (web#511). O jsdom não aplica CSS, então o teste confere a classe.
   */
  it('todo botão mostra a mãozinha', () => {
    const { container } = aPagina()

    const botoes = [...container.querySelectorAll('button, summary, [role=button]')]
    expect(botoes.length).toBeGreaterThan(0)
    for (const botao of botoes) {
      expect(botao.className, botao.textContent ?? '').toMatch(/\bcursor-pointer\b/)
    }
  })

  /**
   * Quem navega por título no leitor de tela salta de um nível para o próximo,
   * e um h4 logo depois de um h2 parece subseção de algo que não existe. Eram
   * três: o cartão do hero (h1→h3), o preview do app e o rodapé (h2→h4).
   */
  it('os títulos não pulam nível', () => {
    const { container } = aPagina()

    const niveis = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => ({
      nivel: Number(h.tagName[1]),
      texto: h.textContent?.trim(),
    }))
    expect(niveis[0]?.nivel).toBe(1)
    for (let i = 1; i < niveis.length; i++) {
      expect(niveis[i].nivel, `${niveis[i - 1].texto} → ${niveis[i].texto}`).toBeLessThanOrEqual(niveis[i - 1].nivel + 1)
    }
  })
})
