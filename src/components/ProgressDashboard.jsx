import { useMemo, useState } from 'react';

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

  const series = useMemo(() => buildDays(history, range), [history, range]);
  const max = useMemo(() => {
    const values = series.map((s) => s[metric]);
    return Math.max(10, ...values);
  }, [series, metric]);

  const total = series.reduce((sum, s) => sum + s[metric], 0);
  const average = Math.round(total / series.length);
  const best = series.reduce((acc, s) => (s[metric] > acc[metric] ? s : acc), series[0]);

  const W = 320;
  const H = 140;
  const PAD = 24;
  const barWidth = (W - PAD * 2) / series.length;
  const innerHeight = H - PAD * 2;

  const metricColor = metric === 'xp' ? '#1C9770' : '#93CB52';

  return (
    <section className="bg-white rounded-2xl p-5 shadow-card flex flex-col gap-4" aria-label="Dashboard de progresso">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2 className="text-base font-bold text-cq-text m-0">Seu progresso</h2>
          <p className="text-xs text-cq-text-muted m-0 mt-0.5">
            Últimos {range} dias · {metric === 'xp' ? 'Experiência' : 'Pontos CarePlus'}
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
            className="appearance-none bg-cq-bg border border-transparent rounded-full px-3 py-1 text-xs font-bold text-cq-text focus:outline-none focus:ring-2 focus:ring-cq-primary"
          >
            <option value={7}>7 dias</option>
            <option value={14}>14 dias</option>
            <option value={30}>30 dias</option>
          </select>
        </div>
      </div>

      {/* Gráfico SVG */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Gráfico de ${metric === 'xp' ? 'XP' : 'pontos'} dos últimos ${range} dias`}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1={PAD}
              x2={W - PAD}
              y1={PAD + innerHeight * pct}
              y2={PAD + innerHeight * pct}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
          ))}

          {series.map((point, i) => {
            const barHeight = (point[metric] / max) * innerHeight;
            const x = PAD + i * barWidth + barWidth * 0.15;
            const y = PAD + innerHeight - barHeight;
            const w = barWidth * 0.7;
            return (
              <g key={point.date}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={barHeight}
                  rx="3"
                  fill={metricColor}
                  opacity={point[metric] > 0 ? 1 : 0.15}
                >
                  <title>{point.date}: {point[metric]} {metric.toUpperCase()}</title>
                </rect>
                {range <= 14 && (
                  <text
                    x={x + w / 2}
                    y={H - 6}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#6B6B6B"
                  >
                    {point.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] text-cq-text-muted uppercase font-bold m-0">Total</p>
          <strong className="text-cq-primary text-lg block">{total}</strong>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-cq-text-muted uppercase font-bold m-0">Média/dia</p>
          <strong className="text-cq-text text-lg block">{average}</strong>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-cq-text-muted uppercase font-bold m-0">Melhor dia</p>
          <strong className="text-cq-text text-lg block">{best?.[metric] || 0}</strong>
        </div>
      </div>
    </section>
  );
}

export default ProgressDashboard;
