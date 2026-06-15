import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', icon: 'lni lni-home-2', label: 'Início' },
  { path: '/trilhas', icon: 'lni lni-route-1', label: 'Trilhas' },
  { path: '/carteira', icon: 'lni lni-wallet-1', label: 'Carteira' },
  { path: '/perfil', icon: 'lni lni-user-4', label: 'Perfil' },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.path === location.pathname)
  );

  return (
    <>
      {/* Mobile/Tablet: barra inferior flutuante com bolha morphing */}
      <nav
        className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[420px] h-[68px] bg-cq-surface flex items-stretch justify-between p-1.5 rounded-[22px] z-50 backdrop-blur-md shadow-[0_10px_30px_-8px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.05),0_0_0_1px_rgba(20,20,20,0.04)]"
        aria-label="Navegação principal"
      >
        {/* A pill ocupa 1/4 da área útil (100% - 12px de padding). Cada step de
            translateX(N*100%) move pela própria largura, casando com cada botão. */}
        <span
          className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc((100%-12px)/4)] rounded-2xl pointer-events-none transition-transform duration-[450ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[linear-gradient(135deg,#1C9770_0%,#167a5a_100%)] shadow-[0_4px_14px_rgba(28,151,112,0.32),inset_0_1px_0_rgba(255,255,255,0.15)]"
          aria-hidden="true"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {NAV_ITEMS.map((item, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={item.path}
              className={`group flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-[10px] font-semibold rounded-2xl font-display tracking-tight border-0 bg-transparent cursor-pointer relative z-[1] transition-colors duration-300 ${
                active ? 'text-white' : 'text-cq-text-muted hover:text-cq-primary'
              }`}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
            >
              <i
                className={`${item.icon} text-[22px] transition-transform duration-300 ${
                  active ? '-translate-y-px scale-105' : 'group-hover:-translate-y-0.5 group-hover:scale-110'
                }`}
                aria-hidden="true"
              ></i>
              <span className={`text-[10px] leading-none ${active ? 'opacity-100 font-bold' : 'opacity-85'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop: sidebar lateral fixa */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-white shadow-card flex-col p-6 gap-2 z-40 overflow-hidden"
        aria-label="Navegação lateral"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(122, 209, 195, 0.10) 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(147, 203, 82, 0.08) 0%, transparent 50%)',
        }}
      >
        {/* Noise overlay sem mexer no position do aside */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative z-10 flex items-center gap-2.5 mb-8 px-1">
          <span
            className="w-11 h-11 rounded-2xl bg-cq-primary text-white flex items-center justify-center shadow-lg shadow-cq-primary/30"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #1C9770 0%, #167a5a 100%)',
            }}
          >
            <i className="fa-solid fa-shield-heart text-lg"></i>
          </span>
          <h1 className="font-display text-[22px] font-extrabold text-cq-text m-0 tracking-tighter">
            Care<span className="text-cq-primary">Quest</span>
          </h1>
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
                  active
                    ? 'bg-cq-primary text-white shadow-lg shadow-cq-primary/20 translate-x-0'
                    : 'text-cq-text-muted hover:bg-cq-bg hover:text-cq-text hover:translate-x-1'
                }`}
              >
                <i className={`${item.icon} text-xl`} aria-hidden="true"></i>
                <span className="font-display tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default BottomNav;
