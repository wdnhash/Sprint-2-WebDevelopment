/**
 * Footer global da aplicação.
 * Fecha a estrutura semântica cabeçalho / corpo / rodapé exigida pela disciplina
 * e reúne créditos da equipe e links institucionais do projeto.
 * Estilizado 100% com TailwindCSS.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="max-w-shell mx-auto px-6 pt-8 pb-6 text-center border-t border-black/5"
      role="contentinfo"
    >
      <div className="flex items-center justify-center gap-2 font-display font-bold text-cq-primary">
        <i className="lni lni-shield-2-check text-lg" aria-hidden="true"></i>
        <span>CareQuest</span>
      </div>

      <p className="mt-2 text-xs text-cq-text-muted leading-relaxed">
        Jornada gamificada do cuidado contínuo — Challenge Care Plus.
      </p>

      <nav
        className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium"
        aria-label="Links do projeto"
      >
        <a
          href="https://github.com/wdnhash/Sprint-2-WebDevelopment"
          target="_blank"
          rel="noreferrer"
          className="text-cq-primary no-underline hover:underline"
        >
          Repositório
        </a>
        <span className="text-cq-text-muted/40" aria-hidden="true">•</span>
        <a
          href="https://www.figma.com/proto/iLP8PrNaU3wFyUkkEr8toQ/CareChallenge--Copy-?node-id=53-1193&t=V7Jo0HCJsQVLa3Vw-1"
          target="_blank"
          rel="noreferrer"
          className="text-cq-primary no-underline hover:underline"
        >
          Protótipo
        </a>
      </nav>

      <p className="mt-4 text-[11px] text-cq-text-muted/80">
        © {year} CareQuest · FIAP — Engenharia de Software. Projeto acadêmico.
      </p>
    </footer>
  );
}

export default Footer;
