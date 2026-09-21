import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const reportaErro = vi.hoisted(() => vi.fn())
vi.mock('./observabilidade', () => ({ reportaErro, observabilidadeConfigurada: () => false }))

import { getNumerosPublicos } from './stats'

const respostaOk = {
  ok: true,
  json: async () => ({ data: { jogadores: 10, matchesAbertas: 2, cidades: 3, arenas: 4 } }),
}

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

/**
 * O `null` esconde os cartões da prova social, e isso está certo: "0 jogadores"
 * na home é número errado, e número errado é afirmação falsa.
 *
 * O que o #111 acrescenta é o aviso. Sem ele, a prova social podia sumir por uma
 * semana sem ninguém reparar — a landing no ar, bonita, vendendo um produto que
 * parece não ter usuário nenhum. Foi o que aconteceu em 21/09/2026, quando a api
 * passou a responder 500 por cota de banco estourada.
 */
describe('getNumerosPublicos', () => {
  it('devolve os números quando a api responde', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => respostaOk))

    await expect(getNumerosPublicos()).resolves.toMatchObject({ jogadores: 10 })
    expect(reportaErro).not.toHaveBeenCalled()
  })

  it('com a api em 500: esconde os cartões E avisa, com o status', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 500 })))

    await expect(getNumerosPublicos()).resolves.toBeNull()
    expect(reportaErro).toHaveBeenCalledTimes(1)
    expect(reportaErro.mock.calls[0][0]).toMatchObject({ message: expect.stringContaining('500') })
    expect(reportaErro.mock.calls[0][1]).toMatchObject({ origem: 'stats' })
  })

  it('com a rede fora: esconde os cartões E avisa', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('fetch failed')
      }),
    )

    await expect(getNumerosPublicos()).resolves.toBeNull()
    expect(reportaErro).toHaveBeenCalledTimes(1)
  })
})
