/**
 * O fundo que atravessa a página inteira (landing#102).
 *
 * ## Por que existe
 *
 * Depois do hero, a página era cor lisa: `bg-gray-950` e `bg-gray-900`
 * alternados, e o único movimento era a entrada de cada bloco, uma vez. O fundo
 * dá vida às dezessete seções sem pedir atenção de nenhuma.
 *
 * ## O desenho
 *
 * **Linhas de quadra de várias modalidades** — tênis, basquete, vôlei e futsal —,
 * e não o campo de futebol que o hero e a grade de modalidades desenhavam. É o
 * mesmo pedido da landing#100, dito pelo fundo. Por baixo, três manchas de luz
 * verde e algumas bolas que andam devagar.
 *
 * ## As regras
 *
 * - **Uma camada `fixed`, atrás de tudo** (`-z-10`), e as seções com fundo um
 *   pouco translúcido por cima. O conteúdo nunca fica atrás do desenho.
 * - **Só CSS, só `transform` e `opacity`.** São propriedades que o navegador
 *   compõe sem refazer layout, e nada aqui escuta scroll: é a mesma regra do
 *   `useMobileScrollAnimation` para tela pequena. Nenhum `filter: blur` animado
 *   — a luz é `radial-gradient`, que não custa nada para mover.
 * - **Movimento de dezenas de segundos**, ida e volta. Rápido, ele competiria com
 *   o texto; lento, ele só existe para quem para de ler.
 * - **`prefers-reduced-motion`** desliga tudo em `globals.css`, e o desenho fica
 *   parado onde está.
 * - **Decoração:** `aria-hidden` e `pointer-events: none`.
 *
 * Server Component: não há estado nem efeito, e o fundo chega pronto no HTML.
 */

const TRACO = { stroke: '#22c55e', fill: 'none', vectorEffect: 'non-scaling-stroke' } as const

function QuadraDeTenis() {
  // Proporção real de 23,77 × 10,97 m, com os corredores de duplas.
  return (
    <svg viewBox="0 0 238 110" {...TRACO} strokeWidth={1.2}>
      <rect x="1" y="1" width="236" height="108" />
      <line x1="1" y1="14.7" x2="237" y2="14.7" />
      <line x1="1" y1="95.3" x2="237" y2="95.3" />
      <line x1="119" y1="1" x2="119" y2="109" strokeDasharray="3 3" />
      <line x1="55" y1="14.7" x2="55" y2="95.3" />
      <line x1="183" y1="14.7" x2="183" y2="95.3" />
      <line x1="55" y1="55" x2="183" y2="55" />
    </svg>
  )
}

function QuadraDeBasquete() {
  return (
    <svg viewBox="0 0 280 150" {...TRACO} strokeWidth={1.2}>
      <rect x="1" y="1" width="278" height="148" />
      <line x1="140" y1="1" x2="140" y2="149" />
      <circle cx="140" cy="75" r="18" />
      <rect x="1" y="50" width="58" height="50" />
      <rect x="221" y="50" width="58" height="50" />
      <path d="M1 14 H30 A66 66 0 0 1 30 136 H1" />
      <path d="M279 14 H250 A66 66 0 0 0 250 136 H279" />
    </svg>
  )
}

function QuadraDeVolei() {
  // 18 × 9 m, com a linha central e as de ataque a 3 m.
  return (
    <svg viewBox="0 0 180 90" {...TRACO} strokeWidth={1.2}>
      <rect x="1" y="1" width="178" height="88" />
      <line x1="90" y1="1" x2="90" y2="89" strokeWidth={2} />
      <line x1="60" y1="1" x2="60" y2="89" />
      <line x1="120" y1="1" x2="120" y2="89" />
    </svg>
  )
}

function QuadraDeFutsal() {
  return (
    <svg viewBox="0 0 200 120" {...TRACO} strokeWidth={1.2}>
      <rect x="1" y="1" width="198" height="118" />
      <line x1="100" y1="1" x2="100" y2="119" />
      <circle cx="100" cy="60" r="15" />
      <path d="M1 30 A30 30 0 0 1 1 90" />
      <path d="M199 30 A30 30 0 0 0 199 90" />
    </svg>
  )
}

export default function FundoAnimado() {
  return (
    <div aria-hidden="true" className="fundo-animado pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      <div className="fundo-luz fundo-luz-1" />
      <div className="fundo-luz fundo-luz-2" />
      <div className="fundo-luz fundo-luz-3" />

      <div className="fundo-quadra fundo-quadra-1"><QuadraDeTenis /></div>
      <div className="fundo-quadra fundo-quadra-2"><QuadraDeBasquete /></div>
      <div className="fundo-quadra fundo-quadra-3"><QuadraDeVolei /></div>
      <div className="fundo-quadra fundo-quadra-4"><QuadraDeFutsal /></div>

      <span className="fundo-bola fundo-bola-1" />
      <span className="fundo-bola fundo-bola-2" />
      <span className="fundo-bola fundo-bola-3" />
      <span className="fundo-bola fundo-bola-4" />
    </div>
  )
}
