/**
 * O fundo animado (landing#102), e as três coisas que não podem quebrar calado.
 *
 * O desenho em si não se testa aqui — é revisão visual. O que se testa é o que
 * a revisão visual não pega: o fundo roubando clique, sendo lido pelo leitor de
 * tela, ou continuando a se mexer para quem pediu menos movimento.
 */

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { render } from '@testing-library/react'
import FundoAnimado from './FundoAnimado'

describe('FundoAnimado', () => {
  it('é decoração: escondido do leitor de tela, sem pegar clique, atrás de tudo', () => {
    const { container } = render(<FundoAnimado />)
    const fundo = container.firstElementChild as HTMLElement

    expect(fundo).toHaveAttribute('aria-hidden', 'true')
    expect(fundo.className).toContain('pointer-events-none')
    expect(fundo.className).toContain('fixed')
    expect(fundo.className).toContain('-z-10')
  })

  it('desenha quadras de mais de uma modalidade, e não um campo de futebol só', () => {
    const { container } = render(<FundoAnimado />)

    expect(container.querySelectorAll('.fundo-quadra svg').length).toBeGreaterThanOrEqual(3)
  })

  it('para tudo com prefers-reduced-motion', () => {
    const css = readFileSync('src/app/globals.css', 'utf8')
    const bloco = css.slice(css.lastIndexOf('@media (prefers-reduced-motion: reduce)'))

    expect(bloco).toContain('.fundo-animado')
    expect(bloco).toMatch(/animation:\s*none\s*!important/)
  })

  it('anima só transform e opacity, que o navegador compõe sem refazer layout', () => {
    const css = readFileSync('src/app/globals.css', 'utf8')
    const keyframes = [...css.matchAll(/@keyframes fundo-[\w-]+\s*\{([\s\S]*?)\}\s*\}/g)].map((m) => m[1])

    expect(keyframes.length).toBeGreaterThan(0)
    for (const quadro of keyframes) {
      const propriedades = [...quadro.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1])
      expect(propriedades.every((p) => p === 'transform' || p === 'opacity'), quadro).toBe(true)
    }
  })
})
