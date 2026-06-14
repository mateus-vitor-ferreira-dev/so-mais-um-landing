# ⚽ FutMatch — Landing Page

![CI](https://github.com/mateus-vitor-ferreira-dev/futmatch-landing/actions/workflows/ci-cd.yml/badge.svg)

Landing page da plataforma **FutMatch**: organize peladas, encontre quadras e monte seu time em um único lugar.

**Landing:** https://futmatch-landing.vercel.app  
**App:** https://futmatch-web.vercel.app  
**API:** https://futmatch-api-production.up.railway.app

## Stack

- **Next.js 15** (App Router) com **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP 3** — animações de entrada (ScrollTrigger no desktop, IntersectionObserver no mobile)
- **shadcn/ui** — componentes base (`Button`, `Badge`)
- **Lucide React** — ícones

## Estrutura

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # Composição das seções
│   └── globals.css
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── CourtsSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── button.tsx
│       └── badge.tsx
└── lib/
    ├── useMobileScrollAnimation.ts   # Hook para animações mobile via IntersectionObserver
    └── utils.ts
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run lint    # ESLint
```

## Deploy

Configurado para deploy automático na **Vercel**. Qualquer push para `main` aciona um deploy.

## Seções da landing

1. **Navbar** — logo, CTA "Entrar no app"
2. **Hero** — headline, subtítulo, CTA principal + animação GSAP
3. **Stats** — estatísticas da plataforma (peladas, quadras, jogadores)
4. **Features** — 6 funcionalidades principais em cards
5. **How It Works** — passo a passo em 3 etapas
6. **Courts** — as 11 modalidades suportadas
7. **CTA** — chamada final para cadastro
8. **Footer** — links e créditos
