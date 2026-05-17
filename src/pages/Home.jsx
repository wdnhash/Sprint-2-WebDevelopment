import { useMemo, useState } from 'react';
import MissionCompleteModal from '../components/MissionCompleteModal';
import { useFetch } from '../hooks/useFetch';
import { getMissions } from '../services/api';
import './Home.css';

const CATEGORIES = [
  { value: 'todas', label: 'Todas as categorias' },
  { value: 'movimento', label: 'Movimento' },
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'mente', label: 'Mente' },
  { value: 'sono', label: 'Sono' },
];

function Home({ userStats, onComplete }) {
  const { name, streak, level, title, xp, avatar = 'fa-user', completedMissions = [] } = userStats;
  const [modalData, setModalData] = useState(null);
  const [category, setCategory] = useState('todas');
  const [tab, setTab] = useState('daily');

  const { data, loading, error } = useFetch(getMissions, []);

  const xpProgress = Math.min((xp % 100) / 100 * 100, 100);

  const missions = useMemo(() => {
    if (!data) return [];
    const list = tab === 'weekly' ? data.weekly : data.daily;
    if (category === 'todas') return list;
    return list.filter((m) => m.category === category);
  }, [data, tab, category]);

  const handleMissionClick = (mission) => {
    if (completedMissions.includes(mission.id)) return;
    onComplete(mission.xp, mission.pts, mission.id);
    setModalData({ xp: mission.xp, pts: mission.pts, title: mission.title });
  };

  return (
    <div className="lg:max-w-shell lg:mx-auto" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <header className="missions__header">
        <div className="missions__header-top">
          <div className="missions__header-identity">
            <div className="missions__avatar" style={{ backgroundColor: '#fff', color: 'var(--color-primary)', fontSize: '24px' }}>
              <i className={`fa-solid ${avatar}`}></i>
            </div>
            <div className="missions__greeting">
              <p>Olá, {name}</p>
              <h1>Vamos nos cuidar?</h1>
            </div>
          </div>
          <span className="missions__streak" aria-label={`Sequência atual de ${streak} dias`}>
            <i className="fa-solid fa-fire" aria-hidden="true"></i>
            {streak} dias
          </span>
        </div>

        <div className="missions__progress">
          <div className="missions__progress-text">
            <span className="level">Nível {level}</span>
            <span className="classification">{title}</span>
          </div>
          <div className="missions__progress-bar" role="progressbar" aria-valuenow={xpProgress} aria-valuemin="0" aria-valuemax="100">
            <span style={{ width: `${xpProgress}%` }}></span>
          </div>
        </div>
      </header>

      <main className="missions__main">

        {/* Tabs Diária / Semanal + Filtro */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full bg-white p-1 shadow-card self-start">
            <button
              type="button"
              onClick={() => setTab('daily')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${
                tab === 'daily'
                  ? 'bg-cq-primary text-white'
                  : 'text-cq-text-muted hover:text-cq-text'
              }`}
              aria-pressed={tab === 'daily'}
            >
              Diárias
            </button>
            <button
              type="button"
              onClick={() => setTab('weekly')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${
                tab === 'weekly'
                  ? 'bg-cq-primary text-white'
                  : 'text-cq-text-muted hover:text-cq-text'
              }`}
              aria-pressed={tab === 'weekly'}
            >
              Semanais
            </button>
          </div>

          <div className="relative">
            <label htmlFor="category-filter" className="sr-only">Filtrar missões por categoria</label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm font-medium text-cq-text shadow-card focus:outline-none focus:ring-2 focus:ring-cq-primary"
            >
              {CATEGORIES.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cq-text-muted pointer-events-none" aria-hidden="true"></i>
          </div>
        </div>

        <h2>{tab === 'weekly' ? 'Desafios da semana' : 'Missões de hoje'}</h2>

        {loading && (
          <div className="flex items-center justify-center py-10 text-cq-text-muted">
            <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true"></i>
            Carregando missões...
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
            Não foi possível carregar as missões. Tente recarregar a página.
          </div>
        )}

        {!loading && !error && missions.length === 0 && (
          <div className="text-center py-10 text-cq-text-muted">
            <i className="fa-solid fa-leaf text-3xl mb-2 block" aria-hidden="true"></i>
            Nenhuma missão nessa categoria por hoje.
          </div>
        )}

        <div className="missions__list">
          {missions.map((mission) => {
            const done = completedMissions.includes(mission.id);
            return (
              <button
                key={mission.id}
                className={`mission-card ${done ? 'opacity-60' : ''}`}
                onClick={() => handleMissionClick(mission)}
                aria-label={`Missão: ${mission.title}. +${mission.xp} XP, +${mission.pts} pontos.${done ? ' Já concluída.' : ''}`}
                disabled={done}
              >
                <div className="mission-card__body">
                  <div className="mission-card__chips">
                    <span className="chip">{tab === 'weekly' ? 'Semanal' : 'Diária'}</span>
                    <span className={`chip ${mission.chipColor}`}>{mission.type}</span>
                    {done && <span className="chip chip--green"><i className="fa-solid fa-check mr-1" aria-hidden="true"></i>Feita</span>}
                  </div>
                  <h3 className="mission-card__title">{mission.title}</h3>
                  <p className="mission-card__desc">{mission.desc}</p>
                </div>
                <div className="mission-card__rewards">
                  <span className="mission-card__xp">+{mission.xp} XP</span>
                  <span className="mission-card__pts">+{mission.pts} pts</span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {modalData && (
        <MissionCompleteModal
          xp={modalData.xp}
          pts={modalData.pts}
          title={modalData.title}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
}

export default Home;
