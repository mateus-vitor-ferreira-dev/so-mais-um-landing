'use client'

import { useEffect } from 'react'
import { reportaErro } from '@/lib/observabilidade'

/**
 * A rede de segurança de baixo de tudo (#111).
 *
 * Só aparece quando o próprio `layout.tsx` quebrou — por isso ela traz `html` e
 * `body` próprios e **não usa componente nenhum do site**: o que quebrou pode
 * ser justamente o que eles importam. Estilo inline pelo mesmo motivo, já que
 * a folha de estilo global entra pelo layout que acabou de falhar.
 */
export default function ErroGlobal({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    reportaErro(error, { origem: 'global-error.tsx', ...(error.digest ? { digest: error.digest } : {}) })
  }, [error])

  return (
    <html lang="pt-BR">
      <body
        style={{
          minHeight: '100vh',
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: 24,
          backgroundColor: '#030712',
          color: '#e5e7eb',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
        }}
      >
        <div role="alert" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#fff' }}>Algo deu errado do nosso lado</h1>
          <p style={{ margin: 0, maxWidth: '60ch', lineHeight: 1.75, color: '#9ca3af' }}>
            O site não conseguiu carregar. Já sabemos do problema — recarregar costuma resolver.
          </p>
        </div>
        {/* 44px de altura na mão: aqui não há Tailwind para garantir o alvo de toque. */}
        <button
          onClick={() => retry()}
          style={{
            minHeight: 44,
            padding: '0 24px',
            borderRadius: 9999,
            border: 'none',
            backgroundColor: '#22c55e',
            color: '#030712',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Recarregar a página
        </button>
      </body>
    </html>
  )
}
