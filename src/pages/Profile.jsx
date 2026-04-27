import './Profile.css';

function Profile({ userStats }) {
  const { name, title, level, streak } = userStats;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER DE PERFIL */}
      <header className="profile__header">
        <div className="profile__top">
          <h1>Perfil</h1>
          <button aria-label="Configurações">
            <i className="lni lni-gear-1" aria-hidden="true"></i>
          </button>
        </div>

        <div className="profile__identity">
          <div className="profile__avatar" aria-hidden="true">
            <i className="fa-regular fa-user"></i>
          </div>
          <div className="profile__name">
            <h2>{name}</h2>
            <p>{title}</p>
          </div>
        </div>

        <div className="profile__stats">
          <div className="profile__stat-card">
            <p>Nível</p>
            <strong>{level}</strong>
          </div>
          <div className="profile__stat-card">
            <p>Streak</p>
            <strong>{streak} dias</strong>
          </div>
        </div>
      </header>

      {/* MENU DE OPÇÕES */}
      <main className="profile__main">
        <nav className="profile__menu" aria-label="Atalhos do perfil">
          <button className="profile__menu-item">
            <span className="profile__menu-content">
              <span className="profile__menu-icon" aria-hidden="true">
                <i className="fa-regular fa-bell"></i>
              </span>
              <span className="text">Notificações</span>
            </span>
            <i className="lni lni-angle-double-right arrow" aria-hidden="true"></i>
          </button>
          
          <button className="profile__menu-item">
            <span className="profile__menu-content">
              <span className="profile__menu-icon profile__menu-icon--gray" aria-hidden="true">
                <i className="lni lni-gear-1"></i>
              </span>
              <span className="text">Configurações</span>
            </span>
            <i className="lni lni-angle-double-right arrow" aria-hidden="true"></i>
          </button>
          
          <button className="profile__menu-item">
            <span className="profile__menu-content">
              <span className="profile__menu-icon profile__menu-icon--gray" aria-hidden="true">
                <i className="lni lni-question-circle"></i>
              </span>
              <span className="text">Ajuda &amp; Suporte</span>
            </span>
            <i className="lni lni-angle-double-right arrow" aria-hidden="true"></i>
          </button>
        </nav>

        <button className="profile__exit">
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
          <span>Sair da conta</span>
        </button>
      </main>
    </div>
  );
}

export default Profile;