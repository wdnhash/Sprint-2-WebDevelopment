import { useState } from 'react';
import './Wallet.css';

function Wallet({ userStats }) {
  const { carePoints, xp } = userStats;
  const [activeTab, setActiveTab] = useState('recompensas');

  const rewards = [
    { id: 1, title: "1 Mês Premium Headspace", category: "Headspace", icon: "fa-headphones", cost: 500, locked: true },
    { id: 2, title: "Desconto em Tênis", category: "Centauro", icon: "fa-shoe-prints", cost: 200, locked: false },
    { id: 3, title: "E-book de Receitas", category: "CarePlus", icon: "fa-book", cost: 100, locked: false }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="wallet__header" role="banner">
        <h1 className="wallet__title">Carteira CareQuest</h1>

        {/* CARD PRINCIPAL DA CARTEIRA */}
        <section className="wallet__balance-card" aria-label="Saldo da carteira">
          <div className="wallet__balance-row">
            <p>SALDO ATUAL</p>
            <div className="wallet__balance-amount">
              <i className="fa-solid fa-coins" aria-hidden="true"></i>
              <h2>{carePoints} <span>pts</span></h2>
            </div>
          </div>
          <div className="wallet__xp-row">
            <p>XP Total acumulado</p>
            <strong>{xp} XP</strong>
          </div>
        </section>

        {/* ABAS */}
        <nav className="wallet__tabs" role="tablist" aria-label="Seções da carteira">
          <button 
            className={`wallet__tab ${activeTab === 'recompensas' ? 'wallet__tab--active' : ''}`} 
            onClick={() => setActiveTab('recompensas')}
            role="tab" 
            aria-selected={activeTab === 'recompensas'}
          >
            Recompensas
          </button>
          <button 
            className={`wallet__tab ${activeTab === 'historico' ? 'wallet__tab--active' : ''}`} 
            onClick={() => setActiveTab('historico')}
            role="tab" 
            aria-selected={activeTab === 'historico'}
          >
            Histórico
          </button>
        </nav>
      </header>

      <main className="wallet__main">
        {activeTab === 'recompensas' && (
          <>
            <div className="wallet__main-title">
              <h2>Destaques para você</h2>
              <button className="wallet__see-all">
                Ver tudo <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>

            {/* LISTA DINÂMICA DE RECOMPENSAS */}
            <ul className="wallet__cards">
              {rewards.map((item) => (
                <li key={item.id} className="reward-card">
                  <div className={`reward-card__logo ${item.locked ? 'reward-card__logo--gray' : ''}`} aria-hidden="true">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="reward-card__body">
                    <div className="reward-card__info">
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                    </div>
                    <div className="reward-card__action">
                      <span className={`reward-card__price ${item.locked ? 'reward-card__price--locked' : ''}`}>
                        {item.locked && <i className="lni lni-locked-2" aria-hidden="true" style={{ marginRight: '4px' }}></i>} 
                        {item.cost} pts
                      </span>
                      {!item.locked && (
                        <button className="reward-card__redeem">Resgatar</button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        
        {activeTab === 'historico' && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '40px', marginBottom: '15px', color: 'var(--color-border)' }}></i>
            <p>Seu histórico de transações aparecerá aqui.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Wallet;