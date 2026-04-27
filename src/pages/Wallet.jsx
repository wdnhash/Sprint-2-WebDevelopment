function Wallet({ userStats }) {
  const { carePoints, xp } = userStats;

  const rewards = [
    { id: 1, title: "1 Mês Premium Headspace", category: "Headspace", cost: 500, locked: true },
    { id: 2, title: "Desconto em Tênis", category: "Centauro", cost: 200, locked: false },
    { id: 3, title: "E-book de Receitas", category: "CarePlus", cost: 100, locked: false }
  ];

  return (
    <main style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--text-dark)' }}>Carteira CareQuest</h2>
      
      {/* CARD PRINCIPAL DA CARTEIRA */}
      <div style={{ backgroundColor: 'var(--dark-green)', color: 'var(--bg-card)', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 15px rgba(24,134,89,0.3)', marginBottom: '20px' }}>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Saldo atual</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '20px' }}>
          <span style={{ fontSize: '24px' }}>🪙</span>
          <h1 style={{ margin: 0, fontSize: '36px' }}>{carePoints}</h1>
          <span style={{ fontSize: '16px', opacity: 0.9 }}>pts</span>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', opacity: 0.9 }}>XP Total acumulado</span>
          <strong style={{ fontSize: '16px' }}>{xp} XP</strong>
        </div>
      </div>

      {/* ABAS (Recompensas / Histórico) */}
      <div style={{ display: 'flex', backgroundColor: 'var(--bg-card)', borderRadius: '25px', padding: '5px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', backgroundColor: 'var(--bg-card)', borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: 'var(--text-dark)' }}>Recompensas</div>
        <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', color: 'var(--text-muted)' }}>Histórico</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-dark)' }}>Destaques para você</h3>
        <span style={{ color: 'var(--primary-green)', fontSize: '14px', fontWeight: 'bold' }}>Ver tudo {'>'}</span>
      </div>

      {/* LISTA DINÂMICA DE RECOMPENSAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {rewards.map((item) => (
          <div key={item.id} style={{ backgroundColor: 'var(--bg-card)', padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: item.locked ? 'var(--border-light)' : 'var(--primary-green)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--bg-card)', fontSize: '12px', fontWeight: 'bold' }}>
                LOGO
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: item.locked ? 'var(--text-muted)' : 'var(--text-dark)' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>{item.category}</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', color: item.locked ? 'var(--text-light)' : 'var(--primary-green)' }}>
                {item.locked ? '🔒 ' : ''}{item.cost} pts
              </div>
              {!item.locked && (
                <div style={{ fontSize: '10px', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', padding: '4px 8px', borderRadius: '10px', marginTop: '5px', display: 'inline-block' }}>Resgatar</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Wallet;