# CareQuest – Jornada Gamificada do Cuidado Contínuo 🛡️

Bem-vindo ao repositório Front-End do **CareQuest**, a solução gamificada desenvolvida para o Challenge Care Plus (Sprint 2 - Web Development). O objetivo deste projeto é transformar a saúde preventiva em uma jornada envolvente e recompensadora, incentivando hábitos saudáveis através de missões diárias, trilhas de saúde e um sistema de recompensas.

## 🚀 Tecnologias Utilizadas

Este projeto foi migrado de um protótipo estático (HTML/CSS) para uma aplicação moderna e componentizada utilizando:

- **[React 19](https://react.dev/)**: Biblioteca JavaScript para construção de interfaces de usuário dinâmicas.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build super rápida e otimizada para o ecossistema moderno.
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas SPA (Single Page Application) protegidas e públicas.
- **CSS3 (Custom Properties/Variables)**: Estilização componentizada mantendo total fidelidade ao design system original do protótipo, garantindo consistência visual.
- **[Bootstrap 5](https://getbootstrap.com/)**: Sistema de grid e utilitários base.
- **[FontAwesome](https://fontawesome.com/) & [LineIcons](https://lineicons.com/)**: Bibliotecas de ícones de alta qualidade para a interface gamificada.

## 🌟 Funcionalidades Implementadas (Sprint 2)

Conforme os requisitos da disciplina de **Web Development**:
1. **Arquitetura React + Vite**: Projeto totalmente estruturado com componentes reutilizáveis (`Home`, `Onboarding`, `Profile`, `Wallet`, `BottomNav`).
2. **Estado Global e Persistência (Local Storage)**: Lógica implementada no `App.jsx` para salvar o progresso do usuário (XP, Pontos, Streak, Nível, Nome e Avatar), mantendo os dados mesmo após recarregar a página.
3. **Fidelidade Visual ao Protótipo**: Integração minuciosa do CSS original com variáveis globais (`index.css`), garantindo que o React seja visualmente idêntico ou superior ao protótipo HTML da Sprint 1.
4. **Interatividade e Eventos**: Manipulação do DOM via React (Hooks como `useState` e `useEffect`), como a barra de XP dinâmica e a edição de avatar/nome na tela de Perfil.

## 🌐 Acesso Online (Deploy)

Você pode acessar a versão mais recente da aplicação rodando direto no navegador, sem precisar instalar nada, através do link abaixo:

👉 **[INSERIR LINK DO VERCEL AQUI]**

*(Professores: Recomendamos acessar o link acima simulando a visualização de um dispositivo móvel no navegador (F12 > Toggle Device Toolbar) para a melhor experiência, pois o App Shell foi desenhado com foco Mobile-First).*

---

## 💻 Como rodar o projeto localmente

Caso deseje avaliar o código-fonte e rodar a aplicação em sua própria máquina, siga os passos abaixo.

### Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** (versão 18+ recomendada) instalado em seu computador.

### Passo a passo da Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/[SEU-USUARIO]/[NOME-DO-REPOSITORIO].git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd sprint2-webdev
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra o endereço `http://localhost:5173` (ou a porta indicada no terminal) em seu navegador.

### Como testar o Onboarding novamente?
A aplicação salva seu progresso no `localStorage` do navegador. Caso queira visualizar as telas iniciais de "Boas-vindas" e "LGPD" do zero, basta:
- Abrir o projeto em uma aba anônima do navegador.
- Ou acessar o Console de Desenvolvedor (F12) > Application > Local Storage e excluir a chave `careQuestData`, recarregando a página em seguida.

## 👥 Equipe
- Wenderson da Silva Santos          RM: 567847
- Douglas Taveira Vilella Roberto    RM: 567846
- Fábio Alexandre Barbosa Filho      RM: 567419
- Gilberto Hideaki Matsunaga         RM: 568191
- Igor Davi Avelar Rosa Cesário      RM: 568163
