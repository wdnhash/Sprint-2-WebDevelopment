import { useMemo, useState } from 'react';
import MissionCompleteModal from '../components/MissionCompleteModal';
import ProgressDashboard from '../components/ProgressDashboard';
import { useFetch } from '../hooks/useFetch';
import { getMissions } from '../services/api';
import { levelProgress } from '../lib/gamification';

const CATEGORIES = [
  { value: 'todas', label: 'Todas as categorias' },
  { value: 'movimento', label: 'Movimento' },
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'mente', label: 'Mente' },
  { value: 'sono', label: 'Sono' },
];

// Acento por categoria da missão (borda lateral + chip "Concluída").
// Strings literais para o JIT do Tailwind conseguir detectar as classes.
const CATEGORY_STYLES = {
  movimento: { borderL: 'border-l-[#00A63E]', chipDone: 'bg-[#00A63E]/[0.12] text-[#00A63E]' },
  alimentacao: { borderL: 'border-l-[#F54900]', chipDone: 'bg-[#F54900]/[0.12] text-[#F54900]' },
  mente: { borderL: 'border-l-[#9810FA]', chipDone: 'bg-[#9810FA]/[0.12] text-[#9810FA]' },
  sono: { borderL: 'border-l-[#1E40AF]', chipDone: 'bg-[#1E40AF]/[0.12] text-[#1E40AF]' },
};
const DEFAULT_STYLE = { borderL: 'border-l-cq-primary', chipDone: 'bg-cq-primary/[0.12] text-cq-primary' };

// Cor do chip de tipo da missão (vindo do JSON como "chip--green" etc.)
const CHIP_COLORS = {
  'chip--green': 'bg-[#DCFCE7] text-[#00A63E]',
  'chip--red': 'bg-[#FFEDD4] text-[#F54900]',
  'chip--purple': 'bg-[#F3E8FF] text-[#9810FA]',
  'chip--blue': 'bg-[#DBEAFE] text-[#1E40AF]',
};

const CHIP_BASE = 'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold leading-snug uppercase';

function Home({ userStats, onComplete }) {
  const { name, streak, level, title, xp, avatar = 'fa-user', completedMissions = [], xpHistory = [] } = userStats;
  const [modalData, setModalData] = useState(null);
  const [category, setCategory] = useState('todas');
  const [tab, setTab] = useState('daily');

  const { data, loading, error } = useFetch(getMissions, []);

  const xpProgress = levelProgress(xp);

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
    <div className="lg:max-w-shell lg:mx-auto bg-cq-bg min-h-screen flex flex-col">

      <header className="cq-mesh-light cq-noise relative overflow-hidden flex flex-col gap-6 px-6 pt-7 pb-6 rounded-b-[28px] shadow-[0_4px_20px_rgba(20,20,20,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-1 min-w-0 gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-white text-cq-primary text-2xl">
              <i className={`fa-solid ${avatar}`}></i>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-cq-text-muted m-0 font-medium">Olá, {name}</p>
              <h1 className="text-lg font-bold text-cq-text m-0 tracking-tight">Vamos nos cuidar?</h1>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold shrink-0 transition-all ${
              streak >= 7
                ? 'text-white bg-[linear-gradient(135deg,#FFB020_0%,#F54900_50%,#DC2626_100%)] shadow-[0_4px_12px_rgba(245,73,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.15)] animate-streak-pulse'
                : 'bg-[#FFEDD4] text-[#F54900]'
            }`}
            aria-label={`Sequência atual de ${streak} dias`}
          >
            <i className="fa-solid fa-fire" aria-hidden="true"></i>
            <span className="cq-numeric">{streak}</span> dias
          </span>
        </div>

        {/* XP herói — métrica gigante que ancora visualmente */}
        <div className="flex items-baseline gap-2 font-display leading-none tracking-[-0.04em]">
          <strong className="text-[56px] font-extrabold text-cq-text tabular-nums">{xp.toLocaleString('pt-BR')}</strong>
          <span className="text-lg font-semibold text-cq-primary tracking-normal">XP</span>
          <small className="text-[13px] text-cq-text-muted ml-2 font-sans tracking-normal font-medium">Nível {level} · {title}</small>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cq-primary font-bold">{Math.round(xpProgress)}% até o nível {level + 1}</span>
            <span className="text-cq-text-muted cq-numeric">{xp % 100}/100</span>
          </div>
          <div
            className={`w-full h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden relative transition-shadow ${
              xpProgress >= 90 ? 'shadow-[0_0_0_3px_rgba(122,209,195,0.20),0_0_12px_2px_rgba(147,203,82,0.35)]' : ''
            }`}
            role="progressbar"
            aria-valuenow={xpProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span
              className="block h-full rounded-full bg-[linear-gradient(90deg,#1C9770,#93CB52)] relative overflow-hidden transition-[width] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${xpProgress}%` }}
            >
              <span className="absolute inset-y-0 right-0 w-6 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] animate-shimmer" aria-hidden="true"></span>
            </span>
          </div>
        </div>
      </header>

      <main className="p-6 flex-1 flex flex-col gap-4">

        <ProgressDashboard history={xpHistory} />

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

        <h2 className="text-lg font-bold text-cq-text m-0">{tab === 'weekly' ? 'Desafios da semana' : 'Missões de hoje'}</h2>

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

        <div className="flex flex-col gap-4">
          {missions.map((mission) => {
            const done = completedMissions.includes(mission.id);
            const accent = CATEGORY_STYLES[mission.category] || DEFAULT_STYLE;
            return (
              <button
                key={mission.id}
                className={`relative overflow-hidden w-full text-left flex items-stretch justify-between gap-4 pl-[1.375rem] pr-5 py-[1.125rem] rounded-2xl shadow-card border-0 border-l-4 ${accent.borderL} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover disabled:cursor-default disabled:translate-y-0 ${
                  done ? 'bg-[#FAFBFC] cursor-default' : 'bg-cq-surface cursor-pointer'
                }`}
                onClick={() => handleMissionClick(mission)}
                aria-label={`Missão: ${mission.title}. +${mission.xp} XP, +${mission.pts} pontos.${done ? ' Já concluída.' : ''}`}
                disabled={done}
              >
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {done ? (
                      <span className={`${CHIP_BASE} ${accent.chipDone} gap-1`}>
                        <i className="fa-solid fa-check text-[9px]" aria-hidden="true"></i>
                        Concluída
                      </span>
                    ) : (
                      <span className={`${CHIP_BASE} bg-[#F3F4F6] text-cq-text-muted`}>{tab === 'weekly' ? 'Semanal' : 'Diária'}</span>
                    )}
                    <span className={`${CHIP_BASE} ${CHIP_COLORS[mission.chipColor] || 'bg-[#F3F4F6] text-cq-text-muted'}`}>{mission.type}</span>
                  </div>
                  <h3 className={`text-base font-bold m-0 ${done ? 'line-through decoration-2 text-cq-text-muted' : 'text-cq-text'}`}>{mission.title}</h3>
                  <p className={`text-sm leading-snug m-0 ${done ? 'text-[#9CA3AF]' : 'text-cq-text-muted'}`}>{mission.desc}</p>
                </div>
                <div className="flex flex-col items-end justify-center gap-1.5 shrink-0 min-w-[70px]">
                  <span className={`text-sm font-bold text-cq-primary cq-numeric ${done ? 'opacity-55 line-through' : ''}`}>+{mission.xp} XP</span>
                  <span className={`bg-cq-secondary text-white px-2.5 py-1 rounded-full text-[10px] font-bold cq-numeric ${done ? 'opacity-55 line-through' : ''}`}>+{mission.pts} pts</span>
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
