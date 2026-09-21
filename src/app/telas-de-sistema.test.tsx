import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NaoEncontrada from './not-found'
import Erro from './error'

const reportaErro = vi.hoisted(() => vi.fn())
vi.mock('@/lib/observabilidade', () => ({ reportaErro, observabilidadeConfigurada: () => false }))

/**
 * As três telas de sistema nasceram do #111: `src/app/` não tinha `error.tsx`,
 * `global-error.tsx` nem `not-found.tsx`, e um erro em produção caía na tela
 * crua do Next — sem a identidade do produto, sem caminho de volta e sem
 * ninguém ficar sabendo.
 *
 * A landing é pública e anônima: quem encontra um defeito aqui fecha a aba.
 */
describe('not-found', () => {
  it('diz o que houve sem culpar quem chegou, e oferece a saída', () => {
    render(<NaoEncontrada />)

    expect(screen.getByRole('heading', { name: 'Essa página não existe' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/')
    // O texto fala do endereço, não de quem digitou.
    expect(screen.getByText(/O endereço pode ter mudado de lugar/)).toBeInTheDocument()
  })

  /**
   * Endereço que não existe é navegação, não defeito: link velho de campanha,
   * endereço digitado à mão, rastreador chutando caminho. No painel de erros
   * isso seria ruído que ninguém pode consertar.
   */
  it('NÃO reporta nada — 404 não é defeito', () => {
    render(<NaoEncontrada />)

    expect(reportaErro).not.toHaveBeenCalled()
  })
})

describe('error', () => {
  it('reporta o erro e oferece tentar de novo', async () => {
    const retry = vi.fn()
    const erro = Object.assign(new Error('quebrou'), { digest: 'abc123' })

    render(<Erro error={erro} retry={retry} />)

    expect(reportaErro).toHaveBeenCalledTimes(1)
    expect(reportaErro.mock.calls[0][1]).toMatchObject({ origem: 'error.tsx', digest: 'abc123' })

    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    expect(retry).toHaveBeenCalled()
  })

  /**
   * Erro anunciado só pela cor não existe para quem usa leitor de tela: o que
   * mudou na página precisa de `role="alert"`.
   */
  it('anuncia a falha para leitor de tela', () => {
    render(<Erro error={new Error('quebrou')} retry={vi.fn()} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado do nosso lado')
  })

  /** Tela de erro sem caminho de saída é beco: a pessoa fecha a aba. */
  it('tem saída para o início, além do tentar de novo', () => {
    render(<Erro error={new Error('quebrou')} retry={vi.fn()} />)

    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/')
  })
})
