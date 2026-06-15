import { useId, useMemo, useState } from 'react';

function buildDays(history, days) {
  const today = new Date();
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const entry = history.find((h) => h.date === iso);
    result.push({
      date: iso,
      label: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      xp: entry?.xp || 0,
      pts: entry?.pts || 0,
    });
  }
  return result;
}

function ProgressDashboard({ history = [] }) {
  const [range, setRange] = useState(7);
  const [metric, setMetric] = useState('xp');
  const gradId = useId();
  const glowId = useId();

  const series = useMemo(() => buildDays(history, range), [history, range]);
  const max = useMemo(() => {
    const values = series.map((s) => s[metric]);
    return Math.max(10, ...values);
  }, [series, metric]);

  const total = series.reduce((sum, s) => sum + s[metric], 0);
  const average = Math.round(total / series.length);
  const best = series.reduce((acc, s) => (s[metric] > acc[metric] ? s : acc), series[0]);

  const W = 320;
  const H = 160;
  const PAD_X = 16;
  const PAD_TOP = 16;
  const PAD_BOTTOM = 28;
  const barWidth = (W - PAD_X * 2) / series.length;
  const innerHeight = H - PAD_TOP - PAD_BOTTOM;

  const metricFromColor = metric === 'xp' ? '#1C9770' : '#93CB52';
  const metricToColor = metric === 'xp' ? '#7AD1C3' : '#7AD180';

  // Posição Y da linha de média
  const averageY = PAD_TOP + innerHeight - (average / max) * innerHeight;

  return (
    <section
      className="bg-white rounded-2xl p-5 shadow-card flex flex-col gap-4 relative overflow-hidden"
      aria-label="Dashboard de progresso"
      style={{
        backgroundImage:
          'radial-gradient(circle at 100% 0%, rgba(122, 209, 195, 0.10) 0%, transparent 55%)',
      }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2 className="font-display text-[17px] font-bold text-cq-text m-0 tracking-tight">
            Seu progresso
          </h2>
          <p className="text-xs text-cq-text-muted m-0 mt-0.5">
            Últimos <span className="cq-numeric">{range}</span> dias · {metric === 'xp' ? 'Experiência' : 'Pontos CarePlus'}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="inline-flex rounded-full bg-cq-bg p-1">
            <button
              type="button"
              onClick={() => setMetric('xp')}
              aria-pressed={metric === 'xp'}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                metric === 'xp' ? 'bg-white text-cq-text shadow-card' : 'text-cq-text-muted'
              }`}
            >
              XP
            </button>
            <button
              type="button"
              onClick={() => setMetric('pts')}
              aria-pressed={metric === 'pts'}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                metric === 'pts' ? 'bg-white text-cq-text shadow-card' : 'text-cq-text-muted'
              }`}
            >
              PTS
            </button>
          </div>
          <select
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            aria-label="Selecionar período do gráfico"
            className="appearance-none bg-cq-bg border border-transparent rounded-full px-3 py-1 text-xs font-bold text-cq-text focus:outline-none focus:ring-2 focus:ring-cq-primary cursor-pointer"
          >
            <option value={7}>7 dias</option>
            <option value={14}>14 dias</option>
            <option value={30}>30 dias</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Gráfico de ${metric === 'xp' ? 'XP' : 'pontos'} dos últimos ${range} dias`}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={metricFromColor} stopOpacity="1" />
              <stop offset="100%" stopColor={metricToColor} stopOpacity="0.7" />
            </linearGradient>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid horizontal */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={PAD_TOP + innerHeight * pct}
              y2={PAD_TOP + innerHeight * pct}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
          ))}

          {/* Barras (renderizadas ANTES da linha de média para a média ficar por cima) */}
          {series.map((point, i) => {
            const value = point[metric];
            const barHeight = (value / max) * innerHeight;
            const x = PAD_X + i * barWidth + barWidth * 0.18;
            const y = PAD_TOP + innerHeight - barHeight;
            const w = barWidth * 0.64;
            const isBest = best && point.date === best.date && value > 0;
            const showLabel = range <= 14 && (value > 0 || range <= 7);

            return (
              <g key={point.date}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={Math.max(barHeight, 2)}
                  rx="3"
                  fill={value > 0 ? `url(#${gradId})` : '#F3F4F6'}
                  filter={isBest ? `url(#${glowId})` : undefined}
                  opacity={value > 0 ? 1 : 0.6}
                >
                  <title>{point.date}: {value} {metric.toUpperCase()}</title>
                </rect>
                {/* Coroa no melhor dia */}
                {isBest && (
                  <text
                    x={x + w / 2}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#F4B860"
                  >
                    ★
                  </text>
                )}
                {showLabel && (
                  <text
                    x={x + w / 2}
                    y={H - 10}
                    textAnchor="middle"
                    fontSize="9"
                    fill={value > 0 ? '#374151' : '#9CA3AF'}
                    fontWeight={value > 0 ? '600' : '400'}
                  >
                    {point.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Linha tracejada de média — renderizada POR CIMA das barras
              com label em pill branco para garantir legibilidade */}
          {average > 0 && (
            <g>
              <line
                x1={PAD_X}
                x2={W - PAD_X}
                y1={averageY}
                y2={averageY}
                stroke="#1F2937"
                strokeWidth="1.25"
                strokeDasharray="4 3"
                opacity="0.85"
              />
              {/* Pill branco de fundo do label */}
              <rect
                x={W - PAD_X - 62}
                y={averageY - 11}
                width="60"
                height="14"
                rx="7"
                fill="#ffffff"
                stroke="#1F2937"
                strokeWidth="1"
                opacity="0.95"
              />
              <text
                x={W - PAD_X - 32}
                y={averageY - 1}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill="#1F2937"
                style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }}
              >
                MÉDIA {average}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] text-cq-text-muted uppercase font-bold tracking-wider m-0">Total</p>
          <strong className="font-display text-cq-primary text-2xl block tabular-nums tracking-tight">{total}</strong>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-cq-text-muted uppercase font-bold tracking-wider m-0">Média/dia</p>
          <strong className="font-display text-cq-text text-2xl block tabular-nums tracking-tight">{average}</strong>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-cq-text-muted uppercase font-bold tracking-wider m-0">Melhor dia</p>
          <strong className="font-display text-cq-text text-2xl block tabular-nums tracking-tight">{best?.[metric] || 0}</strong>
        </div>
      </div>
    </section>
  );
}

export default ProgressDashboard;
