<div align="center">

# ⚽ Só+1 — Landing

### A porta de entrada da plataforma que acaba com o _"falta um?"_ no grupo do WhatsApp.

Landing de conversão do **Só+1**: descubra peladas abertas, entre com um clique e sorteie os times na hora — sem grupo de WhatsApp, sem confusão, só jogo.

<p>
  <a href="https://so-mais-um.com"><img src="https://img.shields.io/badge/▶_Ver_ao_vivo-so--mais--um.com-22C55E?style=for-the-badge&logo=vercel&logoColor=white" alt="Ao vivo"/></a>
  <a href="https://app.so-mais-um.com"><img src="https://img.shields.io/badge/Abrir_o_app-app.so--mais--um.com-3B82F6?style=for-the-badge&logo=googlechrome&logoColor=white" alt="App"/></a>
</p>

<p>
  <img src="https://github.com/mateus-vitor-ferreira-dev/so-mais-um-landing/actions/workflows/ci-cd.yml/badge.svg" alt="CI/CD"/>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19"/>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind v4"/>
  <img src="https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP"/>
  <img src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

<sub>🟢 <strong>Em produção</strong> &nbsp;•&nbsp; 🏟️ <strong>12</strong> modalidades esportivas &nbsp;•&nbsp; 🎬 animações scroll-driven &nbsp;•&nbsp; ⚡ deploy contínuo</sub>

<br/><br/>

![Landing Só+1 — a cena rolando](docs/screenshots/landing.webp)

<sub><i>A narrativa se revela conforme o scroll — capturado do site em produção.</i></sub>

</div>

---

## 🎯 O que é

Página de marketing de um produto **em produção** — a plataforma [Só+1](https://app.so-mais-um.com) para organizar peladas amadoras. O objetivo da landing é **converter o visitante em jogador**: comunicar a proposta em segundos e levar ao cadastro no app. Cada seção conta a história `Descobrir → Entrar → Jogar` com uma narrativa visual que se revela conforme o scroll.

## ✨ Destaques de engenharia

- 🎬 **Animações scroll-driven com GSAP** — as seções se revelam com `ScrollTrigger`, dando ritmo e profundidade à narrativa sem pesar no carregamento.
- 📱 **Estratégia de animação responsiva** — no **desktop** usa `ScrollTrigger`; no **mobile** troca para um hook próprio com `IntersectionObserver` (`useMobileScrollAnimation`), evitando o custo de scroll-linked animation em telas menores. Decisão consciente de **performance × experiência**.
- ⚡ **Next.js 16 (App Router) + React 19 + Tailwind v4** — stack atual, build estático entregue na borda pela Vercel.
- 🧩 **Composição limpa** — cada seção é um componente isolado em `components/landing/`, orquestrado por um único `page.tsx`; UI base com shadcn/ui + ícones Lucide.
- 🚀 **CI/CD** — GitHub Actions (lint + build) e deploy automático na Vercel a cada push em `main`; PRs geram preview.

## 🧱 Stack

**Next.js 16** (App Router) · **React 19** · **TypeScript** (strict) · **Tailwind CSS v4** · **GSAP 3** (ScrollTrigger) · shadcn/ui · Lucide · **Vercel**

## 📐 Anatomia da página

`Navbar` → `Hero` (headline + card de pelada + prova social) → `Stats` → `Features` (6 cards) → `How It Works` (3 passos) → `Courts` (11 modalidades) → `CTA` → `Footer`

## 🚀 Rodando localmente

```bash
git clone https://github.com/mateus-vitor-ferreira-dev/so-mais-um-landing.git
cd so-mais-um-landing
npm install
npm run dev      # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `dev` | desenvolvimento com hot-reload |
| `build` | build de produção |
| `lint` | ESLint |

## 🌿 Fluxo & deploy

`main` (produção · [so-mais-um.com](https://so-mais-um.com)) ← `develop` ← `feature/*` · `fix/*`
Push em `main` → deploy de produção na Vercel · PRs → preview automático · commits em Conventional Commits (pt-BR).

---

<div align="center">
<sub>Parte do produto <strong>Só+1</strong> · <a href="https://app.so-mais-um.com">app</a> · <a href="https://github.com/mateus-vitor-ferreira-dev/so-mais-um-api">API</a> · <a href="https://github.com/mateus-vitor-ferreira-dev/so-mais-um-web">Web</a> — Engenharia de Software, UFLA 2026/1</sub>
</div>
