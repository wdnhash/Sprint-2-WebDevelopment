# CareQuest – Jornada Gamificada 🛡️

Bem-vindo ao repositório Front-End do **CareQuest**, a solução gamificada desenvolvida para o Challenge Care Plus. O objetivo deste projeto é transformar a saúde preventiva em uma jornada envolvente e recompensadora, incentivando hábitos saudáveis através de missões diárias, trilhas de saúde, conquistas e um sistema de recompensas.

> **📌 Sprint 3 – Entrega Final:** Esta versão evolui a aplicação React da Sprint 2 com **TailwindCSS**, **consumo de API local (JSON)**, **novas funcionalidades interativas** (formulário de check-in, dashboard de progresso, trilhas e conquistas), **layout adaptativo para Desktop/Tablet/Mobile** e **CSS Grid avançado**.

## 🚀 Tecnologias Utilizadas

- **[React 19](https://react.dev/)** – Biblioteca para construção de interfaces declarativas.
- **[Vite](https://vitejs.dev/)** – Build tool moderna e ultrarrápida.
- **[React Router DOM](https://reactrouter.com/)** – Roteamento SPA com proteção de rotas.
- **[TailwindCSS 3](https://tailwindcss.com/)** – Estilização utilitária moderna e responsiva.
- **CSS3 Customizado + CSS Grid Layout** – Design system híbrido com variáveis globais.
- **[Bootstrap 5](https://getbootstrap.com/)** – Grid e utilitários complementares.
- **[FontAwesome](https://fontawesome.com/) & [LineIcons](https://lineicons.com/)** – Bibliotecas de ícones.

## 🌟 Funcionalidades da Sprint 3

### 🔌 Consumo de API local (JSON)
- Arquivos em `/public/api/`: `missions.json`, `rewards.json`, `trails.json`, `achievements.json`.
- Camada de serviço em `src/services/api.js` com `fetch` nativo.
- Hook customizado `useFetch` (`src/hooks/useFetch.js`) que entrega `data`, `loading` e `error` de forma declarativa.

### 🎯 Tela Inicial (Missões + Dashboard)
- **Drop-down** de filtro por categoria (movimento, alimentação, mente, sono).
- **Tabs** entre missões Diárias e Semanais.
- **Dashboard de progresso** com gráfico SVG nativo (XP/PTS, 7/14/30 dias).
- Persistência de missões já concluídas evita pontuação duplicada.

### 🛤️ Trilhas e Conquistas (nova tela)
- Página `/trilhas` com cards de trilhas + grid de badges/conquistas.
- **CSS Grid avançado**: layout 2 colunas em tablet, 3-4 colunas em desktop.
- Conquistas avaliadas automaticamente a partir do estado do usuário (XP, nível, streak, recompensas resgatadas).

### 💼 Carteira de Recompensas
- Consumo dinâmico do catálogo via `/api/rewards.json`.
- **Busca** por título/marca + **drop-down** de categoria.
- Fluxo de resgate funcional (desconta pontos, persiste no `localStorage`).
- Aba "Histórico" lista recompensas resgatadas.

### 📝 Check-in Diário (formulário)
- Formulário multi-input no Perfil (humor, horas de sono, copos de água, atividade, notas).
- **Validação de campos** com mensagens de erro inline.
- Recompensa de XP/PTS calculada com base nas métricas do dia.
- Modal acessível (fecha com ESC, focus management).

### 📱 Layout Adaptativo (Mobile-first + Desktop)
- **Mobile/Tablet**: app shell mobile-first com bottom navigation flutuante.
- **Desktop (≥1024px)**: sidebar lateral fixa substituindo a bottom nav, com o conteúdo limitado a `max-w-shell` (768px) e centralizado.
- Breakpoints Tailwind: `sm`, `md`, `lg`.

### ♿ Acessibilidade
- `role`, `aria-label`, `aria-pressed`, `aria-modal` e `aria-current` aplicados onde relevante.
- HTML semântico (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<fieldset>`).
- Foco visível e navegação por teclado (ESC fecha modais).

## 📂 Estrutura do Projeto

```
src/
├── App.jsx                       # Estado global, rotas e ações
├── index.css                     # Variáveis CareQuest + diretivas Tailwind
├── components/
│   ├── CheckInForm.jsx           # Formulário de check-in diário
│   ├── MissionCompleteModal.jsx  # Modal de recompensa (Tailwind)
│   ├── ProgressDashboard.jsx     # Gráfico SVG de XP/pontos
│   └── layout/
│       ├── BottomNav.jsx         # Bottom nav (mobile) + Sidebar (desktop)
│       └── BottomNav.css
├── hooks/
│   └── useFetch.js               # Hook reutilizável de fetch
├── services/
│   └── api.js                    # Camada de serviço das APIs locais
└── pages/
    ├── Home.jsx                  # Missões + Dashboard
    ├── Wallet.jsx                # Recompensas
    ├── Trails.jsx                # Trilhas + Conquistas (nova)
    ├── Profile.jsx               # Perfil + Check-in
    └── Onboarding.jsx            # Fluxo inicial (LGPD + Trilha)
public/
└── api/                          # API JSON local
    ├── missions.json
    ├── rewards.json
    ├── trails.json
    └── achievements.json
```

## 🌐 Acesso Online (Deploy)

👉 **[Vercel](https://sprint-2-web-development.vercel.app/)**

*(Recomendamos acessar com Toggle Device Toolbar (F12) para experiência mobile, ou em tela cheia no desktop para ver o layout com sidebar lateral.)*

## 💻 Como rodar o projeto localmente

### Pré-requisitos
- **[Node.js](https://nodejs.org/)** versão **18+**.

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/wdnhash/Sprint-2-WebDevelopment
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd Sprint-2-WebDevelopment
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:** `http://localhost:5173`

### Como testar o Onboarding novamente?
A aplicação salva seu progresso no `localStorage`. Para revisitar as telas iniciais:
- Abrir em aba anônima, **ou**
- F12 → Application → Local Storage → excluir a chave `careQuestData` → recarregar.

## 🧪 Checklist Sprint 3 (Web Development + Front-End Design)

| Requisito | Onde verificar |
|---|---|
| ✅ Consumo de API (JSON Local) | `src/services/api.js` + `public/api/*.json` |
| ✅ TailwindCSS | `tailwind.config.js` + classes nos componentes novos |
| ✅ CSS Grid Layout avançado | `Trails.jsx` (grid de conquistas), `Wallet.jsx` |
| ✅ Formulário interativo | `components/CheckInForm.jsx` |
| ✅ Modal | `components/MissionCompleteModal.jsx`, `CheckInForm.jsx` |
| ✅ Drop-down | Filtros em `Home.jsx`, `Wallet.jsx`, `ProgressDashboard.jsx` |
| ✅ Manipulação de eventos | Cliques, submits, ESC, change events |
| ✅ Componentização e props | `pages/*` ↔ `components/*` |
| ✅ localStorage / desestruturação | `App.jsx`, hooks em todas as páginas |
| ✅ Responsividade Desktop/Tablet/Mobile | Breakpoints `sm`, `md`, `lg` |
| ✅ Deploy Vercel | Link acima |
| ✅ Versionamento Git semântico | `git log` |

## 🔗 Links Importantes

- **[Protótipo Original (Figma)](https://www.figma.com/proto/iLP8PrNaU3wFyUkkEr8toQ/CareChallenge--Copy-?node-id=53-1193&t=V7Jo0HCJsQVLa3Vw-1)**
- **[Repositório Original (HTML/CSS Sprint 1)](https://github.com/gmatsuna/1esps_challenge_front_end_2026_1_sem)**

## 👥 Equipe

| Nome | RM |
|------|----|
| Douglas Taveira Vilella Roberto | 567846 |
| Fábio Alexandre Barbosa Filho   | 567419 |
| Gilberto Hideaki Matsunaga      | 568191 |
| Igor Davi Avelar Rosa Cesário   | 568163 |
| Wenderson da Silva Santos       | 567847 |

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais — FIAP / Care Plus, 2026.
