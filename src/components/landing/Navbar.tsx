'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import LogoSvg from '@/components/LogoSvg'

const links = [
  { label: 'Funcionalidades', href: '#features' },
  { label: 'Como funciona', href: '#how-it-works' },
  { label: 'Modalidades', href: '#courts' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
    })

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <a href="#" className="flex items-center">
          <LogoSvg width={88} />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-300 hover:text-green-400 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://app.so-mais-um.com/login">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              Entrar
            </Button>
          </a>
          <a href="https://app.so-mais-um.com/register">
            <Button size="sm">Começar grátis</Button>
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-green-400 font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-white/10" />
          <a href="https://app.so-mais-um.com/login">
            <Button variant="ghost" className="w-full text-gray-300">Entrar</Button>
          </a>
          <a href="https://app.so-mais-um.com/register">
            <Button className="w-full">Começar grátis</Button>
          </a>
        </div>
      )}
    </nav>
  )
}
