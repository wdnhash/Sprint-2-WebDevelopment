function Profile({ userStats }) {
  const { name, title, level, streak } = userStats;

  return (
    <main style={{ padding: '0' }}>
      {/* HEADER DE PERFIL */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-surface)', padding: '40px 20px 30px 20px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>Perfil</h2>
          <span style={{ fontSize: '24px' }}>⚙️</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--color-surface)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '40px', color: 'var(--color-primary)' }}>👤</span>
          </div>
          <div>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>{name}</h1>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>{title}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '15px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.9 }}>Nível</p>
            <h3 style={{ margin: 0, fontSize: '24px' }}>{level}</h3>
          </div>
          <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '15px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.9 }}>Streak</p>
            <h3 style={{ margin: 0, fontSize: '24px' }}>{streak} dias</h3>
          </div>
        </div>
      </div>

      {/* MENU DE OPÇÕES */}
      <div style={{ padding: '20px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '20px', padding: '10px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--color-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)', padding: '10px', borderRadius: '50%' }}>🔔</span>
              <strong style={{ color: 'var(--color-text)' }}>Notificações</strong>
            </div>
            <span style={{ color: 'var(--color-text-muted)' }}>{'>'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)', padding: '10px', borderRadius: '50%' }}>⚙️</span>
              <strong style={{ color: 'var(--color-text)' }}>Configurações</strong>
            </div>
            <span style={{ color: 'var(--color-text-muted)' }}>{'>'}</span>
          </div>
          
        </div>

        {/* Uso da cor de erro oficial */}
        <button style={{ width: '100%', padding: '15px', backgroundColor: 'transparent', border: 'none', color: 'var(--color-error)', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          [→ Sair da conta
        </button>
      </div>
    </main>
  );
}

export default Profile;