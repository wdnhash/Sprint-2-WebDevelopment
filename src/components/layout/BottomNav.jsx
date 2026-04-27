import { useLocation, useNavigate } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavStyle = (path) => ({
    flex: 1,
    textAlign: 'center',
    padding: '15px 0',
    cursor: 'pointer',
    color: location.pathname === path ? 'var(--primary-green)' : 'var(--text-light)',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    borderTop: location.pathname === path ? '3px solid var(--primary-green)' : '3px solid transparent',
    transition: 'all 0.2s ease'
  });

  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'var(--bg-card)', display: 'flex', justifyContent: 'space-around', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
      <div style={getNavStyle('/')} onClick={() => navigate('/')}>
        🏠 Início
      </div>
      <div style={getNavStyle('/carteira')} onClick={() => navigate('/carteira')}>
        💳 Carteira
      </div>
      <div style={getNavStyle('/perfil')} onClick={() => navigate('/perfil')}>
        👤 Perfil
      </div>
    </nav>
  );
}

export default BottomNav;