import * as Sentry from '@sentry/nextjs'

/**
 * Liga o Sentry no servidor (#111).
 *
 * Aqui não há `import()` preguiçoso como no `lib/observabilidade.ts`: nada
 * disto vai para o navegador, e o servidor precisa do SDK de pé **antes** da
 * primeira requisição — inclusive para o `onRequestError` abaixo, que é como o
 * Next entrega o erro de render do servidor.
 *
 * Sem `SENTRY_DSN` a função não faz nada e o site sobe igual.
 */
export function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    dsn,
    release: process.env.NEXT_PUBLIC_COMMIT || undefined,
    environment: process.env.NEXT_PUBLIC_AMBIENTE || 'development',
    sendDefaultPii: false,
  })
}

/** O erro que acontece renderizando no servidor chega por aqui. */
export const onRequestError = Sentry.captureRequestError
