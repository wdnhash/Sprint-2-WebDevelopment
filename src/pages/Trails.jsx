import { useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getTrails, getAchievements } from '../services/api';

const RARITY_LABEL = {
  comum: 'Comum',
  raro: 'Raro',
  epico: 'Épico',
  lendario: 'Lendário',
};

const RARITY_ORDER = { comum: 1, raro: 2, epico: 3, lendario: 4 };

function evaluateAchievement(achievement, userStats) {
  const req = achievement.requirement;
  switch (req.type) {
    case 'missions':
      return (userStats.completedMissions?.length || 0) >= req.value;
    case 'streak':
      return (userStats.streak || 0) >= req.value;
    case 'level':
      return (userStats.level || 0) >= req.value;
    case 'rewards_claimed':
      return (userStats.claimedRewards?.length || 0) >= req.value;
    case 'carepoints':
      return (userStats.carePoints || 0) >= req.value;
    case 'trail_complete':
      return userStats.completedTrails?.includes(req.trail) || false;
    case 'xp_category':
      return false;
    default:
      return false;
  }
}

function Trails({ userStats }) {
  const [view, setView] = useState('trilhas');
  const { data: trails, loading: loadingTrails, error: errorTrails } = useFetch(getTrails, []);
  const { data: achievements, loading: loadingAch, error: errorAch } = useFetch(getAchievements, []);

  const userTrailKey = userStats.trilha;

  const unlockedAchievements = useMemo(() => {
    if (!achievements) return new Set();
    return new Set(
      achievements.filter((a) => evaluateAchievement(a, userStats)).map((a) => a.id)
    );
  }, [achievements, userStats]);

  const sortedAchievements = useMemo(() => {
    if (!achievements) return [];
    return [...achievements].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
  }, [achievements]);

  const completed = userStats.completedMissions?.length || 0;

  return (
    <div className="lg:max-w-shell lg:mx-auto" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="bg-white px-6 pt-8 pb-6 rounded-b-3xl shadow-card flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-bold text-cq-text m-0">Trilhas &amp; Conquistas</h1>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100 rounded-full px-3 py-1">
            <i className="fa-solid fa-trophy" aria-hidden="true"></i>
            {unlockedAchievements.size}/{achievements?.length || 0}
          </span>
        </div>

        <nav className="inline-flex rounded-full bg-cq-bg p-1 self-stretch" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'trilhas'}
            onClick={() => setView('trilhas')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-bold transition ${
              view === 'trilhas' ? 'bg-white text-cq-text shadow-card' : 'text-cq-text-muted'
            }`}
          >
            <i className="fa-solid fa-route mr-2" aria-hidden="true"></i>Trilhas
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'conquistas'}
            onClick={() => setView('conquistas')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-bold transition ${
              view === 'conquistas' ? 'bg-white text-cq-text shadow-card' : 'text-cq-text-muted'
            }`}
          >
            <i className="fa-solid fa-medal mr-2" aria-hidden="true"></i>Conquistas
          </button>
        </nav>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-5">
        {view === 'trilhas' && (
          <>
            {loadingTrails && (
              <div className="flex items-center justify-center py-10 text-cq-text-muted">
                <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                Carregando trilhas...
              </div>
            )}
            {errorTrails && (
              <div role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
                Erro ao carregar trilhas.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trails?.map((trail) => {
                const isActive = trail.key === userTrailKey;
                const progress = isActive ? Math.min((completed / trail.totalSteps) * 100, 100) : 0;
                return (
                  <article
                    key={trail.id}
                    className={`bg-white rounded-2xl p-5 shadow-card flex flex-col gap-3 border-2 transition ${
                      isActive ? 'border-cq-primary' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="w-12 h-12 rounded-2xl bg-cq-primary/10 text-cq-primary flex items-center justify-center text-xl flex-shrink-0"
                      >
                        <i className={`fa-solid ${trail.icon}`}></i>
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-base font-bold text-cq-text m-0">{trail.title}</h2>
                          {isActive && (
                            <span className="text-[10px] font-bold uppercase bg-cq-primary text-white rounded-full px-2 py-0.5">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-cq-text-muted m-0 mt-0.5">{trail.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-cq-text-muted m-0">{trail.description}</p>

                    {isActive && (
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs text-cq-text-muted">
                          <span>Progresso</span>
                          <span className="font-bold text-cq-primary">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cq-primary to-cq-secondary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    )}

                    <details className="text-xs">
                      <summary className="cursor-pointer text-cq-primary font-bold select-none">
                        Dicas da trilha
                      </summary>
                      <ul className="mt-2 ml-4 list-disc text-cq-text-muted space-y-1">
                        {trail.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                    </details>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {view === 'conquistas' && (
          <>
            {loadingAch && (
              <div className="flex items-center justify-center py-10 text-cq-text-muted">
                <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                Carregando conquistas...
              </div>
            )}
            {errorAch && (
              <div role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
                Erro ao carregar conquistas.
              </div>
            )}

            {/* Grid avançado com CSS Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {sortedAchievements.map((ach) => {
                const unlocked = unlockedAchievements.has(ach.id);
                return (
                  <article
                    key={ach.id}
                    className={`relative bg-white rounded-2xl p-4 shadow-card flex flex-col items-center text-center gap-2 transition ${
                      unlocked ? '' : 'opacity-60 grayscale'
                    }`}
                    aria-label={`Conquista ${ach.title} ${unlocked ? 'desbloqueada' : 'bloqueada'}`}
                  >
                    {!unlocked && (
                      <span
                        className="absolute top-2 right-2 text-cq-text-muted text-xs"
                        aria-hidden="true"
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white"
                      style={{ backgroundColor: ach.color }}
                    >
                      <i className={`fa-solid ${ach.icon}`}></i>
                    </span>
                    <h3 className="text-sm font-bold text-cq-text m-0 leading-tight">{ach.title}</h3>
                    <p className="text-[11px] text-cq-text-muted leading-snug m-0">{ach.description}</p>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5"
                      style={{
                        backgroundColor: `${ach.color}22`,
                        color: ach.color,
                      }}
                    >
                      {RARITY_LABEL[ach.rarity]}
                    </span>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Trails;
