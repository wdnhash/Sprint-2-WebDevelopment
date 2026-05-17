import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

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
      <nav className="bottom-nav lg:hidden" aria-label="Navegação principal">
        {/* A largura do pill é definida no CSS via calc((100% - 12px) / 4)
            para casar com os 6px de padding do .bottom-nav. translateX(100%)
            move por exatamente uma largura de slot. */}
        <span
          className="bottom-nav__pill"
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
              className={`bottom-nav__item ${active ? 'bottom-nav__item--active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
            >
              <i className={item.icon} aria-hidden="true"></i>
              <span className="bottom-nav__label">{item.label}</span>
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
