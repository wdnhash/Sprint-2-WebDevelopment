import { useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getRewards } from '../services/api';

// Fundo do cartão de saldo (gradiente em camadas) — mantido via style por usar blend-mode.
const BALANCE_BG = {
  backgroundColor: '#167a5a',
  backgroundImage:
    'linear-gradient(135deg, #1C9770 0%, #0f5e44 100%), radial-gradient(circle at 0% 0%, rgba(122,209,195,0.7) 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(147,203,82,0.4) 0%, transparent 50%)',
  backgroundBlendMode: 'normal, screen, screen',
};

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

  const tabClass = (tab) =>
    `flex-1 text-center px-3 py-2.5 rounded-full text-sm font-bold transition-all min-h-[44px] flex items-center justify-center border-0 cursor-pointer ${
      activeTab === tab ? 'bg-cq-surface text-cq-text shadow-[0_2px_6px_rgba(0,0,0,0.05)]' : 'bg-transparent text-cq-text-muted'
    }`;

  return (
    <div className="lg:max-w-shell lg:mx-auto bg-cq-bg min-h-screen flex flex-col">
      <header className="bg-cq-surface px-6 pt-7 pb-6 rounded-b-3xl flex flex-col gap-5 shadow-card" role="banner">
        <h1 className="text-xl font-bold text-cq-text m-0">Carteira CareQuest</h1>

        <section className="cq-noise relative overflow-hidden text-white rounded-3xl p-6 flex flex-col gap-4 shadow-[0_8px_24px_rgba(28,151,112,0.25)]" style={BALANCE_BG} aria-label="Saldo da carteira">
          <div className="flex flex-col gap-2 pb-4 border-b border-white/25">
            <p className="text-xs opacity-90 tracking-wide font-bold m-0">SALDO ATUAL</p>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-coins text-[#FFDF20] text-[28px]" aria-hidden="true"></i>
              <h2 className="text-[2rem] font-bold m-0">{carePoints} <span className="text-base font-medium ml-1">pts</span></h2>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="m-0">XP Total acumulado</p>
            <strong className="font-bold text-base">{xp} XP</strong>
          </div>
        </section>

        <nav className="flex items-center bg-[#F3F4F6] rounded-full p-1" role="tablist" aria-label="Seções da carteira">
          <button
            className={tabClass('recompensas')}
            onClick={() => setActiveTab('recompensas')}
            role="tab"
            aria-selected={activeTab === 'recompensas'}
          >
            Recompensas
          </button>
          <button
            className={tabClass('historico')}
            onClick={() => setActiveTab('historico')}
            role="tab"
            aria-selected={activeTab === 'historico'}
          >
            Histórico
          </button>
        </nav>
      </header>

      <main className="p-6 flex-1 flex flex-col gap-5">
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

            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-cq-text m-0">
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

            <ul className="flex flex-col gap-4 p-0 m-0 list-none lg:grid lg:grid-cols-2">
              {filteredRewards.map((item) => {
                const locked = carePoints < item.cost;
                const claimed = claimedIds.includes(item.id);
                return (
                  <li key={item.id} className="flex items-center gap-4 bg-cq-surface p-[1.125rem] rounded-2xl shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card-hover">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-[22px] shrink-0 ${locked ? 'bg-[#E5E7EB] text-cq-text-muted' : 'bg-cq-secondary text-white'}`} aria-hidden="true">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-cq-text mt-0 mb-1">{item.title}</h3>
                        <p className="text-xs text-cq-text-muted m-0">{item.brand} · {item.category}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 min-w-[88px]">
                        <span className={`font-bold text-sm ${locked ? 'text-cq-text-muted inline-flex items-center gap-1' : 'text-cq-primary'}`}>
                          {locked && <i className="lni lni-locked-2" aria-hidden="true"></i>}
                          {item.cost} pts
                        </span>
                        {!locked && !claimed && (
                          <button
                            type="button"
                            className="bg-cq-primary/15 text-cq-primary px-3 py-1.5 rounded-lg text-xs font-bold min-h-[32px] inline-flex items-center justify-center border-0 cursor-pointer transition-colors hover:bg-cq-primary/25"
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
              <div className="text-center px-5 py-10 text-cq-text-muted">
                <i className="fa-solid fa-clock-rotate-left text-[40px] mb-4 block text-[#E5E7EB]" aria-hidden="true"></i>
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
