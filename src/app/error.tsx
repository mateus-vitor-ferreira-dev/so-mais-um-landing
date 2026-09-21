'use client'

import { useEffect } from 'react'
import TelaDeSistema from '@/components/sistema/TelaDeSistema'
import { Button } from '@/components/ui/button'
import { reportaErro } from '@/lib/observabilidade'

/**
 * O que o visitante vê quando uma página da landing quebra (#111).
 *
 * Antes disto não havia `error.tsx` nenhum: o erro caía na tela crua do Next,
 * sem a identidade do produto, sem caminho de volta e **sem ninguém ficar
 * sabendo** — a landing é pública e anônima, então quem encontra um defeito
 * aqui fecha a aba e nunca conta.
 */
export default function Erro({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    reportaErro(error, { origem: 'error.tsx', ...(error.digest ? { digest: error.digest } : {}) })
  }, [error])

  return (
    <TelaDeSistema
      papel="alert"
      titulo="Algo deu errado do nosso lado"
      descricao="A página não carregou como deveria. Já sabemos do problema — você pode tentar de novo agora mesmo."
      acao={<Button onClick={() => unstable_retry()}>Tentar de novo</Button>}
    />
  )
}
