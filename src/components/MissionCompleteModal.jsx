import { useEffect } from 'react';

function MissionCompleteModal({ xp, pts, title, onClose }) {
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
      <div
        className="bg-white rounded-3xl p-8 text-center w-full max-w-sm shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-2" aria-hidden="true">🎉</div>
        <h2 id="mission-complete-title" className="text-cq-primary text-2xl font-bold mb-1">
          Missão Concluída!
        </h2>
        {title && (
          <p className="text-cq-text text-sm font-medium mb-2">{title}</p>
        )}
        <p className="text-cq-text-muted text-sm leading-relaxed mb-6">
          Você deu mais um passo na sua jornada de saúde. Continue assim!
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50 p-4 rounded-2xl">
            <h3 className="text-cq-primary text-3xl font-extrabold leading-none">+{xp}</h3>
            <p className="text-cq-primary text-xs font-bold mt-1">XP</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl">
            <h3 className="text-orange-600 text-3xl font-extrabold leading-none">+{pts}</h3>
            <p className="text-orange-600 text-xs font-bold mt-1">PTS</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-cq-primary hover:bg-cq-primary-light text-white font-bold rounded-2xl transition-colors"
          autoFocus
        >
          Incrível!
        </button>
      </div>
    </div>
  );
}

export default MissionCompleteModal;
