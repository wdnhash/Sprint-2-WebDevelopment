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
  const itemPct = 100 / NAV_ITEMS.length;

  return (
    <>
      {/* Mobile/Tablet: barra inferior flutuante com bolha morphing */}
      <nav className="bottom-nav lg:hidden" aria-label="Navegação principal">
        <span
          className="bottom-nav__pill"
          aria-hidden="true"
          style={{
            width: `${itemPct}%`,
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
        className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-white shadow-card flex-col p-6 gap-2 z-40 cq-noise"
        aria-label="Navegação lateral"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(122, 209, 195, 0.10) 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(147, 203, 82, 0.08) 0%, transparent 50%)',
        }}
      >
        <div className="flex items-center gap-2.5 mb-8 px-1">
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
      </aside>
    </>
  );
}

export default BottomNav;
