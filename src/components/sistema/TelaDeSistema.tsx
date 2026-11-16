'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import LogoSvg from '@/components/LogoSvg'
import { buttonVariants } from '@/components/ui/button'

/**
 * O esqueleto das três telas de sistema: erro, erro global e 404 (#111).
 *
 * ## A hierarquia, e por que ela é essa
 *
 * Logo → título → uma frase → ação primária → saída secundária. Quem cai aqui
 * quase sempre veio de um link de campanha e **ainda não é cliente**: não tem
 * conta para "tentar de novo mais tarde", não conhece o produto o bastante para
 * insistir, e a alternativa dele é fechar a aba. Então a tela tem que fazer
 * três coisas, nessa ordem: dizer onde ele está (a logo), dizer o que houve sem
 * jargão, e dar um caminho de volta — nunca terminar num beco.
 *
 * ## Regras que valem para as três
 *
 * - **Nunca culpar quem está lendo.** "O endereço não existe mais" e não
 *   "você digitou errado". Na dúvida, a culpa é nossa.
 * - **Ação primária sempre presente.** Tela de erro sem caminho de saída é a
 *   definição de beco: a pessoa fecha a aba, e ela era um cliente em potencial.
 * - **`role="alert"` no que mudou**, porque erro anunciado só pela cor não
 *   existe para quem usa leitor de tela.
 * - **44px de alvo**, que é o `h-11` do `buttonVariants` — a mesma medida que a
 *   auditoria da landing#105 cravou no resto do site.
 * - O par verde/quase-preto do botão primário vem do mesmo lugar: branco sobre
 *   `green-500` dá 2,2:1 e reprova no WCAG AA.
 *
 * ## Por que `'use client'` numa tela sem interação
 *
 * Ela usa o `buttonVariants`, e ele mora no `ui/button.tsx`, que é
 * `'use client'`. Função exportada de módulo de cliente não pode ser **chamada**
 * por componente de servidor: no build, o `not-found` quebrou exatamente aí.
 * As alternativas eram repetir as classes da variante à mão — duas fontes de
 * verdade para o mesmo botão, e o próximo ajuste de contraste pegaria só uma —
 * ou fatiar o `ui/button.tsx`, mexendo em componente que o site inteiro usa por
 * causa de três telas. Marcar estas como cliente é o menor dos três estragos.
 */
interface TelaDeSistemaProps {
  titulo: string
  descricao: string
  /** O que a pessoa faz aqui. Já vem com o alvo de 44px do `buttonVariants`. */
  acao?: ReactNode
  /** `alert` no que o visitante não esperava; a 404 é navegação, não alarme. */
  papel?: 'alert' | 'none'
}

export default function TelaDeSistema({ titulo, descricao, acao, papel = 'none' }: TelaDeSistemaProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-950 px-6 py-16 text-center text-gray-200">
      <Link href="/" aria-label="Voltar para a página inicial">
        <LogoSvg width={104} />
      </Link>

      <div {...(papel === 'alert' ? { role: 'alert' } : {})} className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{titulo}</h1>
        {/* `max-w-leitura`: a mesma medida de linha do resto do site (landing#108). */}
        <p className="max-w-leitura text-base leading-7 text-gray-400">{descricao}</p>
      </div>

      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        {acao}
        <Link className={buttonVariants({ variant: 'ghost' })} href="/">
          Voltar ao início
        </Link>
      </div>
    </main>
  )
}
