'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { buttonVariants } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import LogoSvg from '@/components/LogoSvg'
import { prefereMenosMovimento } from '@/lib/movimento'

/**
 * Na ordem em que as seções aparecem na página (#97).
 *
 * Fora de ordem, navegar pelo menu da esquerda para a direita desce e sobe a
 * página, e o destaque da seção ativa pula para trás ao rolar. Foi assim por
 * meses: "Modalidades" vinha antes de "Para espaços", e a distância cresceu a
 * cada seção nova que entrou entre as duas. O teste "o menu e as âncoras"
 * (`secoes-dos-epicos.test.tsx`) confere a ordem contra o `page.tsx`.
 */
const links = [
  { label: 'Funcionalidades', href: '#features' },
  // As quatro seções da #63 entram no menu como uma só: cada uma tem id
  // próprio para link direto, mas quatro entradas fariam uma navbar de nove
  // itens — e quem procura no menu procura o assunto, não a seção.
  { label: 'Recursos',        href: '#recursos' },
  { label: 'Como funciona',   href: '#how-it-works' },
  { label: 'Para espaços',    href: '#owner' },
  { label: 'Modalidades',     href: '#courts' },
  { label: 'Em breve',        href: '#roadmap' },
]

export default function Navbar() {
  const navRef     = useRef<HTMLElement>(null)
  const mobileRef  = useRef<HTMLDivElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeHref, setActiveHref] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Active section highlight
    const sectionIds = links.map(l => l.href.slice(1))
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(`#${id}`) },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  // Animate mobile menu open/close
  useEffect(() => {
    const el = mobileRef.current
    if (!el) return
    // Sem movimento pedido, o menu só aparece e some.
    if (prefereMenosMovimento()) {
      el.style.display = menuOpen ? 'flex' : 'none'
      el.style.opacity = '1'
      return
    }
    if (menuOpen) {
      el.style.display = 'flex'
      gsap.fromTo(el, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' })
    } else {
      gsap.to(el, {
        opacity: 0, y: -6, duration: 0.15, ease: 'power2.in',
        onComplete: () => { el.style.display = 'none' },
      })
    }
  }, [menuOpen])

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* O logo é desenho: sem o rótulo, o leitor de tela anunciava só "link" (axe, web#511). */}
        <a href="#" aria-label="Só+1, voltar ao início" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
          <LogoSvg width={88} />
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              {/* 24px de altura no mínimo, o alvo de ponteiro do WCAG 2.2 (2.5.8):
                  do tamanho da linha de texto eram 17px (web#511). O texto não
                  sai do lugar — o `items-center` centraliza na caixa maior. */}
              <a
                href={link.href}
                className={cn(
                  'inline-flex min-h-6 items-center text-sm font-medium transition-colors duration-200',
                  activeHref === link.href
                    ? 'text-green-400'
                    : 'text-gray-300 hover:text-green-400'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://app.so-mais-um.com/login"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-gray-300 hover:text-white')}
          >
            Entrar
          </a>
          <a
            href="https://app.so-mais-um.com/register"
            className={cn(buttonVariants({ size: 'sm' }), 'btn-shimmer')}
          >
            Começar grátis
          </a>
        </div>

        {/* 24px de ícone com 10px de folga de cada lado: os 44px de alvo de
            toque (web#511). A margem negativa mantém o ícone alinhado à borda. */}
        <button
          type="button"
          className="lg:hidden text-white p-2.5 -mr-2.5 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu — always mounted, visibility controlled by GSAP */}
      <div
        id="menu-mobile"
        ref={mobileRef}
        style={{ display: 'none' }}
        className="lg:hidden bg-gray-950/97 backdrop-blur-md border-t border-white/10 px-6 py-3 flex-col gap-1"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              // A linha inteira é o alvo, com 44px de altura (web#511).
              'flex min-h-11 items-center font-medium transition-colors text-base',
              activeHref === link.href ? 'text-green-400' : 'text-gray-300'
            )}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <hr className="my-2 border-white/10" />
        <a
          href="https://app.so-mais-um.com/login"
          className={cn(buttonVariants({ variant: 'ghost' }), 'w-full text-gray-300')}
        >
          Entrar
        </a>
        <a
          href="https://app.so-mais-um.com/register"
          className={cn(buttonVariants(), 'mt-2 w-full btn-shimmer')}
        >
          Começar grátis
        </a>
      </div>
    </nav>
  )
}
