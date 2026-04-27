import { useState } from 'react';
import './Profile.css';

function Profile({ userStats, onUpdateUser }) {
  // Recebe avatar do state (se existir), senão usa um padrão
  const { name, title, level, streak, avatar = 'fa-user' } = userStats;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editAvatar, setEditAvatar] = useState(avatar);

  const handleSave = () => {
    if (editName.trim() === '') return;
    onUpdateUser({ name: editName, avatar: editAvatar });
    setIsEditing(false);
  };

  // Opções de ícones do FontAwesome para o usuário escolher
  const avatarOptions = [
    'fa-user',
    'fa-user-ninja',
    'fa-user-astronaut',
    'fa-user-tie',
    'fa-cat',
    'fa-dog',
    'fa-frog',
    'fa-robot'
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER DE PERFIL */}
      <header className="profile__header">
        <div className="profile__top">
          <h1>Perfil</h1>
          <button 
            aria-label={isEditing ? "Cancelar edição" : "Editar perfil"} 
            onClick={() => {
              setIsEditing(!isEditing);
              setEditName(name); // reseta ao abrir/fechar
              setEditAvatar(avatar);
            }}
          >
            <i className={isEditing ? "fa-solid fa-xmark" : "fa-solid fa-pen"} aria-hidden="true"></i>
          </button>
        </div>

        {isEditing ? (
          /* MODO DE EDIÇÃO */
          <div className="profile__identity" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
            <label style={{ fontSize: '14px', opacity: 0.9 }}>Escolha seu avatar:</label>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', width: '100%', paddingBottom: '10px' }}>
              {avatarOptions.map(icon => (
                <button 
                  key={icon}
                  onClick={() => setEditAvatar(icon)}
                  aria-label={`Selecionar avatar ${icon}`}
                  style={{
                    width: '50px', height: '50px', borderRadius: '50%', flexShrink: 0,
                    backgroundColor: editAvatar === icon ? 'var(--color-secondary)' : 'rgba(255,255,255,0.2)',
                    border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <i className={`fa-solid ${icon}`}></i>
                </button>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <input 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                placeholder="Seu nome"
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '16px', color: 'var(--color-text)' }}
              />
              <button 
                onClick={handleSave}
                style={{ backgroundColor: 'var(--color-secondary)', border: 'none', borderRadius: '12px', padding: '0 20px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Salvar
              </button>
            </div>
          </div>
        ) : (
          /* MODO VISUALIZAÇÃO */
          <div className="profile__identity">
            <div className="profile__avatar" aria-hidden="true">
              <i className={`fa-solid ${avatar}`}></i>
            </div>
            <div className="profile__name">
              <h2>{name}</h2>
              <p>{title}</p>
            </div>
          </div>
        )}

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
                {/* Alterado para o ícone de interrogação do FontAwesome, garantindo que irá renderizar */}
                <i className="fa-regular fa-circle-question"></i>
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