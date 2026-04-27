import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <button 
        className={`bottom-nav__item ${location.pathname === '/' ? 'bottom-nav__item--active' : ''}`}
        onClick={() => navigate('/')}
      >
        <i className="lni lni-home-2" aria-hidden="true"></i>
        <span>Início</span>
      </button>
      
      <button 
        className={`bottom-nav__item ${location.pathname === '/carteira' ? 'bottom-nav__item--active' : ''}`}
        onClick={() => navigate('/carteira')}
      >
        <i className="lni lni-wallet-1" aria-hidden="true"></i>
        <span>Carteira</span>
      </button>
      
      <button 
        className={`bottom-nav__item ${location.pathname === '/perfil' ? 'bottom-nav__item--active' : ''}`}
        onClick={() => navigate('/perfil')}
      >
        <i className="lni lni-user-4" aria-hidden="true"></i>
        <span>Perfil</span>
      </button>
    </nav>
  );
}

export default BottomNav;