import { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#1C9770', '#93CB52', '#7AD1C3', '#7AD180', '#F4B860', '#E53935'];
const CONFETTI_COUNT = 18;

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easing: easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function MissionCompleteModal({ xp, pts, title, onClose }) {
  const xpAnimated = useCountUp(xp, 900);
  const ptsAnimated = useCountUp(pts, 900);

  // Confetti gerado uma única vez por mount (posições e delays aleatórios).
  // useState lazy initializer mantém os valores estáveis entre re-renders.
  const [confetti] = useState(() =>
    Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 1.6 + Math.random() * 0.8,
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 6,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: i % 3,
    }))
  );

  useEffect(() => {
    // Haptic feedback em devices que suportarem
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([30, 60, 30]);
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-complete-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Confetti rain */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="cq-confetti"
            style={{
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size * (c.shape === 1 ? 0.4 : 1)}px`,
              backgroundColor: c.color,
              borderRadius: c.shape === 2 ? '50%' : c.shape === 1 ? '2px' : '3px',
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              transform: `rotate(${c.rotation}deg)`,
            }}
          />
        ))}
      </div>

      <div
        className="relative bg-white rounded-[28px] p-8 text-center w-full max-w-sm shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% -10%, rgba(122, 209, 195, 0.25) 0%, transparent 60%)',
        }}
      >
        <div className="text-6xl mb-2 inline-block animate-bounce-soft" aria-hidden="true">🎉</div>
        <h2
          id="mission-complete-title"
          className="font-display text-cq-primary text-[26px] font-extrabold mb-1 tracking-tight"
        >
          Missão Concluída!
        </h2>
        {title && (
          <p className="text-cq-text text-sm font-semibold mb-2">{title}</p>
        )}
        <p className="text-cq-text-muted text-sm leading-relaxed mb-6">
          Mais um passo na sua jornada. Continue assim!
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50 p-4 rounded-2xl relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 100% 100%, rgba(28, 151, 112, 0.18) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
            <h3 className="relative font-display text-cq-primary text-4xl font-extrabold leading-none tabular-nums tracking-tight">
              +{xpAnimated}
            </h3>
            <p className="relative text-cq-primary text-xs font-bold mt-1.5 tracking-widest">XP</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 100% 100%, rgba(245, 73, 0, 0.18) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
            <h3 className="relative font-display text-orange-600 text-4xl font-extrabold leading-none tabular-nums tracking-tight">
              +{ptsAnimated}
            </h3>
            <p className="relative text-orange-600 text-xs font-bold mt-1.5 tracking-widest">PTS</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 bg-cq-primary hover:bg-cq-primary-light text-white font-bold rounded-2xl transition-all hover:shadow-lg hover:shadow-cq-primary/30 font-display tracking-tight"
          autoFocus
        >
          Incrível!
        </button>
      </div>
    </div>
  );
}

export default MissionCompleteModal;
