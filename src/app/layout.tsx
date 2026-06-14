import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Só+1 — Organizar sua pelada nunca foi tão fácil',
  description:
    'Conecte jogadores, reserve quadras e gerencie partidas em um único lugar. Do racha da várzea ao torneio organizado. Gratuito para sempre.',
  keywords: ['pelada', 'futebol', 'quadras', 'esportes', 'organização de partidas', 'sorteio de times', 'futsal', 'beach tennis'],
  openGraph: {
    title: 'Só+1 — Organizar sua pelada nunca foi tão fácil',
    description: 'Plataforma gratuita para organizar peladas, sortear times e avaliar jogadores.',
    type: 'website',
    url: 'https://so-mais-um.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/icon.svg',
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
