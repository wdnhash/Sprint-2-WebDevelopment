import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

const NAV_ITEMS = [
  { path: '/', icon: 'lni lni-home-2', label: 'Início' },
  { path: '/trilhas', icon: 'lni lni-target', label: 'Trilhas' },
  { path: '/carteira', icon: 'lni lni-wallet-1', label: 'Carteira' },
  { path: '/perfil', icon: 'lni lni-user-4', label: 'Perfil' },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile/Tablet: barra inferior flutuante */}
      <nav className="bottom-nav lg:hidden" aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            className={`bottom-nav__item ${location.pathname === item.path ? 'bottom-nav__item--active' : ''}`}
            onClick={() => navigate(item.path)}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            <i className={item.icon} aria-hidden="true"></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop: sidebar lateral fixa */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-white shadow-card flex-col p-6 gap-2 z-40"
        aria-label="Navegação lateral"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-10 h-10 rounded-full bg-cq-primary text-white flex items-center justify-center" aria-hidden="true">
            <i className="fa-solid fa-shield-heart text-lg"></i>
          </span>
          <h1 className="text-lg font-extrabold text-cq-text m-0">CareQuest</h1>
        </div>
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                active
                  ? 'bg-cq-primary text-white shadow-card'
                  : 'text-cq-text-muted hover:bg-cq-bg hover:text-cq-text'
              }`}
            >
              <i className={`${item.icon} text-xl`} aria-hidden="true"></i>
              <span>{item.label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
}

export default BottomNav;
