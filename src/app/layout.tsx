import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FutMatch — Organizar sua pelada nunca foi tão fácil',
  description:
    'Conecte jogadores, reserve quadras e gerencie partidas em um único lugar. Do racha da várzea ao torneio organizado.',
  keywords: ['pelada', 'futebol', 'quadras', 'esportes', 'organização de partidas'],
  openGraph: {
    title: 'FutMatch — Organizar sua pelada nunca foi tão fácil',
    description: 'Plataforma gratuita para organizar peladas e reservar quadras esportivas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">{children}</body>
    </html>
  )
}
