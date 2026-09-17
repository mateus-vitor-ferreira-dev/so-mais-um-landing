/**
 * Quem pediu ao sistema menos movimento (`prefers-reduced-motion: reduce`).
 *
 * As entradas por GSAP e as do `useMobileScrollAnimation` escondem o bloco e o
 * revelam ao rolar. Para quem pediu menos movimento, o bloco já nasce visível:
 * cada efeito consulta isto antes de esconder qualquer coisa, e o CSS em
 * `globals.css` para as animações que não passam por JavaScript (web#511).
 *
 * Lido na hora, e não guardado: a preferência pode mudar com a página aberta, e
 * quem pergunta é sempre um efeito que roda no momento de montar.
 */
export const MENOS_MOVIMENTO = '(prefers-reduced-motion: reduce)'

export function prefereMenosMovimento(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MENOS_MOVIMENTO).matches
}
