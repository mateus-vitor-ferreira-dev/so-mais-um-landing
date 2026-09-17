/**
 * Menos movimento (web#511).
 *
 * Quem liga "reduzir movimento" no sistema não pode encontrar a página com
 * blocos escondidos esperando uma animação que não vem, nem com número contando
 * a partir do zero. O stub do `setup.ts` responde `false` a toda media query;
 * aqui ele passa a responder `true` só para `prefers-reduced-motion`.
 */
import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import StatsSection from '@/components/landing/StatsSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import { MENOS_MOVIMENTO, prefereMenosMovimento } from '@/lib/movimento'

const original = window.matchMedia

function simular(celular: boolean) {
  window.matchMedia = ((query: string) => ({
    ...original(query),
    matches: query === MENOS_MOVIMENTO || (celular && query === '(max-width: 767px)'),
  })) as typeof window.matchMedia
}

afterEach(() => {
  window.matchMedia = original
})

describe('com menos movimento pedido', () => {
  beforeEach(() => simular(false))

  it('a preferência é lida do sistema', () => {
    expect(prefereMenosMovimento()).toBe(true)
  })

  it('a prova social mostra o número pronto, sem contar a partir do zero', () => {
    const { getByText } = render(<StatsSection numeros={null} />)

    expect(getByText('12')).toBeInTheDocument()
    expect(getByText('100%')).toBeInTheDocument()
  })

  it('no celular, nenhum bloco é escondido à espera da rolagem', () => {
    simular(true)
    const { container } = render(<FeaturesSection />)

    expect(container.querySelectorAll('.feature-card')).not.toHaveLength(0)
    expect(container.querySelector('.scroll-hidden')).toBeNull()
  })

  it('o CSS para as animações que não passam por JavaScript', () => {
    const css = readFileSync('src/app/globals.css', 'utf8')
    const bloco = css.slice(css.lastIndexOf('@media (prefers-reduced-motion: reduce)'))

    for (const classe of ['.animate-float', '.animate-float-slow', '.anim-slide-up', '.anim-slide-down', '.btn-shimmer::after']) {
      expect(bloco, classe).toContain(classe)
    }
    expect(bloco).toMatch(/scroll-behavior:\s*auto/)
  })
})

describe('sem a preferência', () => {
  it('no celular, os blocos continuam entrando ao rolar', () => {
    window.matchMedia = ((query: string) => ({
      ...original(query),
      matches: query === '(max-width: 767px)',
    })) as typeof window.matchMedia
    const { container } = render(<FeaturesSection />)

    expect(container.querySelector('.scroll-hidden')).not.toBeNull()
  })
})
