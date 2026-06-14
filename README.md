<div align="center">

<h1>🏠 Só+1 — Landing Page</h1>

<p><strong>Página de apresentação da plataforma de organização de peladas amadoras</strong></p>

<p>
  <a href="https://so-mais-um.com" target="_blank">
    <img src="https://img.shields.io/badge/Acessar-so--mais--um.com-22C55E?style=for-the-badge&logo=vercel&logoColor=white" alt="Landing"/>
  </a>
  <a href="https://app.so-mais-um.com" target="_blank">
    <img src="https://img.shields.io/badge/Web_App-app.so--mais--um.com-3B82F6?style=for-the-badge&logo=vercel&logoColor=white" alt="App"/>
  </a>
</p>

<p>
  <img src="https://github.com/mateus-vitor-ferreira-dev/so-mais-um-landing/actions/workflows/ci-cd.yml/badge.svg" alt="CI/CD"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP"/>
  <img src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

</div>

---

## 📋 Índice

- [Stack](#-stack)
- [Seções](#-seções)
- [Instalação local](#-instalação-local)
- [Estrutura](#-estrutura)
- [Deploy](#-deploy)
- [Convenções](#-convenções)

---

## 🛠️ Stack

<table>
  <tbody>
    <tr>
      <td><strong>Framework</strong></td>
      <td><img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white"/> (App Router)</td>
    </tr>
    <tr>
      <td><strong>Linguagem</strong></td>
      <td><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/></td>
    </tr>
    <tr>
      <td><strong>Estilização</strong></td>
      <td><img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/></td>
    </tr>
    <tr>
      <td><strong>Animações</strong></td>
      <td><img src="https://img.shields.io/badge/GSAP_3-88CE02?style=flat-square&logo=greensock&logoColor=black"/> — ScrollTrigger no desktop · IntersectionObserver no mobile</td>
    </tr>
    <tr>
      <td><strong>Componentes</strong></td>
      <td><img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square"/> (<code>Button</code>, <code>Badge</code>) · <img src="https://img.shields.io/badge/Lucide-222222?style=flat-square"/> (ícones)</td>
    </tr>
    <tr>
      <td><strong>Deploy</strong></td>
      <td><img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/> — deploy automático a cada push em <code>main</code></td>
    </tr>
  </tbody>
</table>

---

## 📄 Seções

| # | Seção | Descrição |
|---|---|---|
| 1 | **Navbar** | Logo + CTA "Entrar no app" |
| 2 | **Hero** | Headline, subtítulo, CTA principal + animação GSAP |
| 3 | **Stats** | Estatísticas da plataforma (peladas, quadras, jogadores) |
| 4 | **Features** | 6 funcionalidades principais em cards |
| 5 | **How It Works** | Passo a passo em 3 etapas |
| 6 | **Courts** | As 11 modalidades suportadas |
| 7 | **CTA** | Chamada final para cadastro |
| 8 | **Footer** | Links e créditos |

---

## 🚀 Instalação local

```bash
# 1. Clonar
git clone https://github.com/mateus-vitor-ferreira-dev/so-mais-um-landing.git
cd so-mais-um-landing

# 2. Instalar dependências
npm install

# 3. Iniciar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts

```bash
npm run dev     # Desenvolvimento com hot-reload
npm run build   # Build de produção
npm run lint    # ESLint
```

---

## 📁 Estrutura

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Composição das seções
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
    ├── useMobileScrollAnimation.ts   # Hook de animação mobile (IntersectionObserver)
    └── utils.ts
```

---

## 🚢 Deploy

Deploy automático na **Vercel** a cada push em `main`.

| Branch | Ambiente |
|---|---|
| `main` | Produção — [so-mais-um.com](https://so-mais-um.com) |
| `develop` / PRs | Preview automático |

---

## 🔧 Convenções

| Item | Padrão |
|---|---|
| Branch principal | `main` — apenas releases estáveis |
| Branch de integração | `develop` |
| Branches de trabalho | `feature/<nome>` ou `fix/<nome>` a partir de `develop` |
| Commits | Conventional Commits em português |

---

<div align="center">
  <sub>Parte do projeto <a href="https://github.com/mateus-vitor-ferreira-dev/tpes-2026-1-so-mais-um">Só+1</a> · Engenharia de Software · UFLA 2026/1</sub>
</div>
