import type { Metadata } from 'next'
import TelaDeSistema from '@/components/sistema/TelaDeSistema'

export const metadata: Metadata = {
  title: 'Página não encontrada | Só+1',
}

/**
 * O 404 com a cara do produto (#111).
 *
 * **Não reporta nada**, e é de propósito: endereço que não existe é navegação,
 * não defeito — link velho de campanha, endereço digitado à mão, rastreador
 * chutando caminho. Mandar isso para o painel de erros encheria o lugar de uma
 * coisa que ninguém precisa consertar.
 *
 * O que ele precisa é não ser um beco: a saída para o início é a única ação, e
 * o texto não culpa quem chegou aqui.
 */
export default function NaoEncontrada() {
  return (
    <TelaDeSistema
      titulo="Essa página não existe"
      descricao="O endereço pode ter mudado de lugar ou o link que te trouxe até aqui está desatualizado."
    />
  )
}
