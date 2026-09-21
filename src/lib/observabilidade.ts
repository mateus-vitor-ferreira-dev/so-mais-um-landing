/**
 * Para onde vai o erro da landing (#111).
 *
 * A landing é a porta de entrada do produto — é onde o dono de quadra chega
 * antes de virar cliente — e é a parte do Só+1 que mais falha em silêncio,
 * porque ninguém está logado para reclamar: quem encontra um defeito aqui
 * simplesmente fecha a aba.
 *
 * **Sem `SENTRY_DSN` nada acontece**, que é a regra dos três repositórios: quem
 * clonou o projeto roda tudo sem abrir conta em serviço nenhum.
 *
 * ## Por que o SDK entra por `import()`
 *
 * No servidor o peso não importa, mas no navegador importa muito: esta é uma
 * página de marketing, e cada quilobyte entra no tempo até o visitante ver a
 * primeira tela. Com o `import()` aqui dentro, **o visitante que não vê erro
 * nenhum não baixa uma linha do SDK** — o chunk só é buscado quando o
 * `error.tsx` ou o `global-error.tsx` já estão na tela, isto é, quando a
 * experiência dele já foi por água abaixo de qualquer jeito.
 */

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''

/** O commit do build, carimbado pela Vercel. Sem ele, todo erro é de uma versão desconhecida. */
const RELEASE = process.env.NEXT_PUBLIC_COMMIT || undefined

/** `production` ou `preview` — todo PR vira deploy, e um não pode poluir o outro. */
const AMBIENTE = process.env.NEXT_PUBLIC_AMBIENTE || 'development'

export function observabilidadeConfigurada(): boolean {
  return Boolean(DSN)
}

/**
 * Manda um erro, com o contexto de quem o pegou.
 *
 * Nunca lança nem espera: quem chama é uma tela de erro ou um `catch` que já
 * está tratando outra coisa, e um erro dentro do repórter de erros deixaria o
 * visitante com a página em branco no lugar do "algo deu errado".
 */
export function reportaErro(erro: unknown, contexto: Record<string, string> = {}): void {
  if (!DSN) return

  void (async () => {
    try {
      const Sentry = await import('@sentry/nextjs')

      // `getClient` é o jeito de perguntar "já iniciou?" sem guardar estado
      // próprio — no servidor quem inicia é o `instrumentation.ts`, no
      // navegador é esta primeira chamada.
      if (!Sentry.getClient()) {
        Sentry.init({ dsn: DSN, release: RELEASE, environment: AMBIENTE, sendDefaultPii: false })
      }

      Sentry.withScope((escopo) => {
        for (const [chave, valor] of Object.entries(contexto)) escopo.setTag(chave, valor)
        Sentry.captureException(erro)
      })
    } catch (falha) {
      console.error('[observabilidade] Falha ao reportar erro:', falha)
    }
  })()
}
