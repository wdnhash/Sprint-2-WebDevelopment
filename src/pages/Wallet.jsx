import { useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getRewards } from '../services/api';
import './Wallet.css';

function Wallet({ userStats, onClaimReward }) {
  const { carePoints, xp, claimedRewards = [] } = userStats;
  const [activeTab, setActiveTab] = useState('recompensas');
  const [category, setCategory] = useState('todas');
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState(null);

  const { data: rewards, loading, error } = useFetch(getRewards, []);

  const categories = useMemo(() => {
    if (!rewards) return ['todas'];
    const unique = [...new Set(rewards.map((r) => r.category))];
    return ['todas', ...unique];
  }, [rewards]);

  const filteredRewards = useMemo(() => {
    if (!rewards) return [];
    return rewards.filter((r) => {
      const matchesCategory = category === 'todas' || r.category === category;
      const matchesSearch = search.trim() === '' ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.brand.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [rewards, category, search]);

  const claimedIds = useMemo(() => claimedRewards.map((r) => r.id), [claimedRewards]);

  const handleClaim = (reward) => {
    if (carePoints < reward.cost) {
      setFeedback({ type: 'error', message: 'Pontos insuficientes para esse resgate.' });
      return;
    }
    if (claimedIds.includes(reward.id)) {
      setFeedback({ type: 'info', message: 'Você já resgatou essa recompensa.' });
      return;
    }
    onClaimReward(reward.id, reward.cost);
    setFeedback({ type: 'success', message: `Resgate realizado: ${reward.title}` });
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <div className="lg:max-w-shell lg:mx-auto" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="wallet__header" role="banner">
        <h1 className="wallet__title">Carteira CareQuest</h1>

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
        {feedback && (
          <div
            role="status"
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
              feedback.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {activeTab === 'recompensas' && (
          <>
            {/* Busca + Drop-down de categoria */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
              <div className="relative">
                <label htmlFor="reward-search" className="sr-only">Buscar recompensas</label>
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-cq-text-muted text-sm" aria-hidden="true"></i>
                <input
                  id="reward-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar recompensa..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cq-primary"
                />
              </div>
              <div className="relative">
                <label htmlFor="reward-category" className="sr-only">Filtrar por categoria</label>
                <select
                  id="reward-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm font-medium text-cq-text focus:outline-none focus:ring-2 focus:ring-cq-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'todas' ? 'Todas as categorias' : cat}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cq-text-muted pointer-events-none" aria-hidden="true"></i>
              </div>
            </div>

            <div className="wallet__main-title">
              <h2>
                {filteredRewards.length} {filteredRewards.length === 1 ? 'recompensa' : 'recompensas'}
                {category !== 'todas' && ` em ${category}`}
              </h2>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-10 text-cq-text-muted">
                <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                Carregando recompensas...
              </div>
            )}

            {error && (
              <div role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
                Erro ao carregar recompensas.
              </div>
            )}

            {!loading && !error && filteredRewards.length === 0 && (
              <div className="text-center py-10 text-cq-text-muted">
                <i className="fa-solid fa-box-open text-3xl mb-2 block" aria-hidden="true"></i>
                Nenhuma recompensa encontrada.
              </div>
            )}

            <ul className="wallet__cards lg:grid lg:grid-cols-2 lg:gap-4 lg:[&>li]:m-0">
              {filteredRewards.map((item) => {
                const locked = carePoints < item.cost;
                const claimed = claimedIds.includes(item.id);
                return (
                  <li key={item.id} className="reward-card">
                    <div className={`reward-card__logo ${locked ? 'reward-card__logo--gray' : ''}`} aria-hidden="true">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div className="reward-card__body">
                      <div className="reward-card__info">
                        <h3>{item.title}</h3>
                        <p>{item.brand} · {item.category}</p>
                      </div>
                      <div className="reward-card__action">
                        <span className={`reward-card__price ${locked ? 'reward-card__price--locked' : ''}`}>
                          {locked && <i className="lni lni-locked-2" aria-hidden="true" style={{ marginRight: '4px' }}></i>}
                          {item.cost} pts
                        </span>
                        {!locked && !claimed && (
                          <button
                            type="button"
                            className="reward-card__redeem"
                            onClick={() => handleClaim(item)}
                          >
                            Resgatar
                          </button>
                        )}
                        {claimed && (
                          <span className="text-emerald-700 text-xs font-bold">
                            <i className="fa-solid fa-check mr-1" aria-hidden="true"></i>Resgatada
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {activeTab === 'historico' && (
          <>
            {claimedRewards.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
                <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '40px', marginBottom: '15px', color: 'var(--color-border)' }}></i>
                <p>Seu histórico de transações aparecerá aqui.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {claimedRewards.slice().reverse().map((entry, idx) => {
                  const reward = rewards?.find((r) => r.id === entry.id);
                  const dateLabel = new Date(entry.claimedAt).toLocaleDateString('pt-BR');
                  return (
                    <li key={`${entry.id}-${idx}`} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-cq-primary/10 text-cq-primary flex items-center justify-center" aria-hidden="true">
                        <i className={`fa-solid ${reward?.icon || 'fa-gift'}`}></i>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-cq-text truncate">{reward?.title || entry.id}</p>
                        <p className="text-xs text-cq-text-muted">{dateLabel}</p>
                      </div>
                      <span className="text-cq-primary text-sm font-bold">-{reward?.cost || ''} pts</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Wallet;
