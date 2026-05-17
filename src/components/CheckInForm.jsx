import { useEffect, useState } from 'react';

const MOOD_OPTIONS = [
  { value: 'pessimo', label: 'Péssimo', emoji: '😞' },
  { value: 'ruim', label: 'Ruim', emoji: '😕' },
  { value: 'normal', label: 'Normal', emoji: '😐' },
  { value: 'bem', label: 'Bem', emoji: '🙂' },
  { value: 'otimo', label: 'Ótimo', emoji: '😄' },
];

const INITIAL_FORM = {
  mood: '',
  sleepHours: 8,
  waterCups: 4,
  activityMinutes: 0,
  notes: '',
};

function CheckInForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!form.mood) errs.mood = 'Selecione como você está se sentindo.';
    if (form.sleepHours < 0 || form.sleepHours > 24) errs.sleepHours = 'Entre 0 e 24 horas.';
    if (form.waterCups < 0 || form.waterCups > 20) errs.waterCups = 'Entre 0 e 20 copos.';
    if (form.activityMinutes < 0 || form.activityMinutes > 600) errs.activityMinutes = 'Entre 0 e 600 minutos.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { mood, sleepHours, waterCups, activityMinutes, notes } = form;
    const xpEarned = 10
      + (Number(sleepHours) >= 7 ? 10 : 0)
      + (Number(waterCups) >= 6 ? 10 : 0)
      + (Number(activityMinutes) >= 20 ? 15 : 0);
    const ptsEarned = Math.round(xpEarned * 0.6);

    onSubmit({
      mood,
      sleepHours: Number(sleepHours),
      waterCups: Number(waterCups),
      activityMinutes: Number(activityMinutes),
      notes: notes.trim(),
      reward: { xp: xpEarned, pts: ptsEarned },
    });
  };

  const update = (field) => (e) => {
    const value = e.target.type === 'number' || ['sleepHours', 'waterCups', 'activityMinutes'].includes(field)
      ? e.target.value
      : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkin-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-pop-in flex flex-col gap-5 my-8"
      >
        <header className="flex items-start justify-between gap-3">
          <div>
            <h2 id="checkin-title" className="text-xl font-extrabold text-cq-text m-0">
              Check-in diário
            </h2>
            <p className="text-sm text-cq-text-muted m-0 mt-1">
              Conte para gente como foi o seu dia hoje :)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="w-9 h-9 rounded-full bg-cq-bg text-cq-text-muted hover:bg-gray-200 flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </header>

        {/* Humor */}
        <fieldset>
          <legend className="text-sm font-bold text-cq-text mb-2">Como você está se sentindo?</legend>
          <div className="grid grid-cols-5 gap-2">
            {MOOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, mood: opt.value }))}
                aria-pressed={form.mood === opt.value}
                aria-label={opt.label}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition ${
                  form.mood === opt.value
                    ? 'border-cq-primary bg-cq-primary/10'
                    : 'border-transparent bg-cq-bg hover:border-gray-200'
                }`}
              >
                <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
                <span className="text-[10px] font-bold text-cq-text-muted uppercase">{opt.label}</span>
              </button>
            ))}
          </div>
          {errors.mood && <p className="text-red-600 text-xs mt-1">{errors.mood}</p>}
        </fieldset>

        {/* Sono */}
        <div>
          <label htmlFor="sleep-hours" className="flex items-center justify-between text-sm font-bold text-cq-text mb-2">
            <span><i className="fa-solid fa-moon mr-1 text-indigo-500" aria-hidden="true"></i>Horas de sono</span>
            <span className="text-cq-primary">{form.sleepHours}h</span>
          </label>
          <input
            id="sleep-hours"
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={form.sleepHours}
            onChange={update('sleepHours')}
            className="w-full accent-cq-primary"
          />
          {errors.sleepHours && <p className="text-red-600 text-xs mt-1">{errors.sleepHours}</p>}
        </div>

        {/* Água */}
        <div>
          <label htmlFor="water-cups" className="flex items-center justify-between text-sm font-bold text-cq-text mb-2">
            <span><i className="fa-solid fa-glass-water mr-1 text-blue-500" aria-hidden="true"></i>Copos de água</span>
            <span className="text-cq-primary">{form.waterCups} copos</span>
          </label>
          <input
            id="water-cups"
            type="range"
            min="0"
            max="12"
            step="1"
            value={form.waterCups}
            onChange={update('waterCups')}
            className="w-full accent-cq-primary"
          />
          {errors.waterCups && <p className="text-red-600 text-xs mt-1">{errors.waterCups}</p>}
        </div>

        {/* Atividade física */}
        <div>
          <label htmlFor="activity-minutes" className="flex items-center justify-between text-sm font-bold text-cq-text mb-2">
            <span><i className="fa-solid fa-person-running mr-1 text-emerald-500" aria-hidden="true"></i>Minutos de atividade</span>
            <span className="text-cq-primary">{form.activityMinutes} min</span>
          </label>
          <input
            id="activity-minutes"
            type="number"
            min="0"
            max="600"
            step="5"
            value={form.activityMinutes}
            onChange={update('activityMinutes')}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cq-primary"
          />
          {errors.activityMinutes && <p className="text-red-600 text-xs mt-1">{errors.activityMinutes}</p>}
        </div>

        {/* Notas */}
        <div>
          <label htmlFor="checkin-notes" className="block text-sm font-bold text-cq-text mb-2">
            Algo a registrar? <span className="font-normal text-cq-text-muted">(opcional)</span>
          </label>
          <textarea
            id="checkin-notes"
            rows="3"
            maxLength="280"
            value={form.notes}
            onChange={update('notes')}
            placeholder="Ex: hoje foi um dia tranquilo..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-cq-primary text-sm"
          />
          <p className="text-[10px] text-cq-text-muted text-right">{form.notes.length}/280</p>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-cq-text-muted font-bold hover:bg-cq-bg transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-[2] py-3 rounded-2xl bg-cq-primary hover:bg-cq-primary-light text-white font-bold transition"
          >
            Registrar check-in
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckInForm;
