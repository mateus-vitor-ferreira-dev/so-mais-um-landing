/**
 * O desenho de cada modalidade (web#511).
 *
 * Até aqui nove das doze eram o emoji do `iconFallback`, e a aparência da grade
 * dependia da fonte de quem visitava. O `contrato:check` confere as chaves do
 * `DESENHOS` contra a api; este arquivo confere o que chega à tela.
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { FALLBACK_SPORTS } from '@/lib/sports'
import IconeModalidade, { ICONES_DESENHADOS } from './IconeModalidade'

describe('IconeModalidade', () => {
  it('tem desenho próprio para as doze modalidades do fallback, e nada além', () => {
    expect([...ICONES_DESENHADOS].sort()).toEqual(FALLBACK_SPORTS.map((s) => s.icon).sort())
  })

  it('é SVG fora da árvore de acessibilidade — o nome da modalidade já está ao lado', () => {
    const { container } = render(<IconeModalidade icon="volei" />)

    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(container.textContent).toBe('')
  })

  it('não repete id de gradiente quando o mesmo ícone aparece duas vezes', () => {
    const { container } = render(
      <>
        <IconeModalidade icon="beach-tennis" />
        <IconeModalidade icon="beach-tennis" />
      </>,
    )

    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id)
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
    // E toda referência aponta para um id que existe.
    for (const el of container.querySelectorAll('[fill^="url(#"], [clip-path^="url(#"]')) {
      const ref = (el.getAttribute('fill') ?? el.getAttribute('clip-path') ?? '').slice(5, -1)
      if (ref) expect(ids).toContain(ref)
    }
  })

  it('desenha uma bola neutra, e não nada, para modalidade que ainda não tem desenho', () => {
    const { container } = render(<IconeModalidade icon="modalidade-nova" />)

    expect(container.querySelector('svg circle')).not.toBeNull()
  })
})
