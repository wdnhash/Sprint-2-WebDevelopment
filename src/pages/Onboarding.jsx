import { useState } from 'react';
import mascoteImg from '../assets/images/mascote.png';

// Estilo base reutilizado pelos cards de objetivo (trilha)
const OPTION_BASE =
  'flex items-center justify-between gap-4 px-5 py-4 bg-cq-surface rounded-2xl border-2 shadow-card cursor-pointer transition-all duration-200 min-h-20 hover:border-cq-accent-1';

function Onboarding({ onFinish }) {
  const [step, setStep] = useState(1);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [selectedTrilha, setSelectedTrilha] = useState(null);

  // Trilhas disponíveis — fonte única para renderizar as opções
  const trilhas = [
    { value: 'Dormir melhor', icon: 'fa-regular fa-moon', iconClass: 'bg-[#E0E7FF] text-[#4F39F6]', isFa: true },
    { value: 'Mexer mais o corpo', icon: 'lni lni-beat', iconClass: 'bg-[#DCFCE7] text-[#00A63E]', isFa: false },
    { value: 'Cuidar da mente', icon: 'fa-solid fa-brain', iconClass: 'bg-[#F3E8FF] text-[#9810FA]', isFa: true },
    { value: 'Me alimentar melhor', icon: 'fa-solid fa-utensils', iconClass: 'bg-[#FFEDD4] text-[#F54900]', isFa: true },
  ];

  return (
    <div className="app-shell bg-cq-bg min-h-screen flex flex-col">

      {/* ETAPA 1: SPLASH / BOAS-VINDAS */}
      {step === 1 && (
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10 text-center min-h-screen bg-cq-bg">
          <header className="relative w-60 h-60 flex items-center justify-center">
            <span
              className="absolute -inset-[30px] rounded-full z-0"
              style={{ background: 'radial-gradient(circle at center, rgba(147, 203, 82, 0.45), transparent 65%)' }}
              aria-hidden="true"
            ></span>
            <img src={mascoteImg} alt="Mascote do CareQuest acenando." className="w-[200px] h-[200px] relative z-[1]" />
          </header>

          <section className="flex flex-col items-center gap-4 max-w-[480px]">
            <h1 className="text-xl font-bold text-cq-text leading-snug">Bem-vindo ao CareQuest</h1>
            <p className="text-base text-cq-text-muted leading-normal">Sua saúde é uma jornada, não um destino. Vamos conquistar hábitos saudáveis juntos, passo a passo.</p>
          </section>

          <nav className="flex justify-center w-full" aria-label="Ação principal">
            <button
              className="btn-primary-cta"
              onClick={() => setStep(2)}
            >
              Começar minha jornada
            </button>
          </nav>
        </main>
      )}

      {/* ETAPA 2: LGPD E PRIVACIDADE */}
      {step === 2 && (
        <main className="flex-1 flex flex-col px-6 pt-8 pb-10 gap-6 min-h-screen bg-cq-bg">
          <div className="w-16 h-16 rounded-2xl bg-cq-primary/[0.12] flex items-center justify-center text-cq-primary text-[28px] self-start" aria-hidden="true">
            <i className="lni lni-shield-2-check"></i>
          </div>

          <header className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-cq-text m-0">Seus dados, seu controle</h1>
            <p className="text-sm text-cq-text-muted m-0">Privacidade e transparência são pilares do CareQuest.</p>
          </header>

          <section className="bg-cq-surface p-5 rounded-2xl shadow-card" aria-label="Aviso de privacidade">
            <p className="text-sm text-cq-text-muted leading-normal m-0">Para criar sua jornada personalizada, precisamos processar algumas informações. Levamos sua privacidade a sério e seguimos rigorosamente a LGPD. Seus dados de saúde são usados exclusivamente para melhorar sua experiência no CareQuest.</p>
          </section>

          <fieldset className="flex flex-col gap-5 border-0 p-0 m-0">
            <label className="flex items-start gap-3 w-full cursor-pointer" htmlFor="lgpd-consent">
              <input
                type="checkbox"
                id="lgpd-consent"
                className="mt-1 w-5 h-5 accent-cq-primary shrink-0 cursor-pointer"
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
              />
              <span className="text-sm text-cq-text leading-snug">
                Li e concordo com os <a href="#termos" onClick={(e) => e.preventDefault()} className="text-cq-primary no-underline font-medium">Termos de Uso</a> e <a href="#privacidade" onClick={(e) => e.preventDefault()} className="text-cq-primary no-underline font-medium">Política de Privacidade</a>. <br/>
                <strong>(Obrigatório)</strong>
              </span>
            </label>
          </fieldset>

          <nav className="flex justify-center mt-6 w-full" aria-label="Ação principal">
            <button
              className="btn-primary-cta"
              onClick={() => setStep(3)}
              disabled={!lgpdAccepted}
            >
              Aceitar e continuar
            </button>
          </nav>
        </main>
      )}

      {/* ETAPA 3: ESCOLHA DA TRILHA */}
      {step === 3 && (
        <main className="flex-1 flex flex-col px-6 pt-8 pb-10 gap-7 bg-cq-bg min-h-screen">
          <header className="flex flex-col gap-2">
            <h1 className="text-xl font-bold leading-snug text-cq-text m-0">O que você quer cuidar primeiro?</h1>
            <p className="text-base text-cq-text-muted m-0">Escolha um objetivo para guiar suas missões.</p>
          </header>

          <div className="flex flex-col gap-4 flex-1">
            {trilhas.map(({ value, icon, iconClass }) => {
              const isSelected = selectedTrilha === value;
              return (
                <label
                  key={value}
                  className={`${OPTION_BASE} ${isSelected ? 'border-cq-primary bg-[#F0FBF6]' : 'border-transparent'}`}
                >
                  <span className="flex items-center gap-4">
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center text-[22px] shrink-0 ${iconClass}`} aria-hidden="true">
                      <i className={icon}></i>
                    </span>
                    <h2 className="text-base font-bold text-cq-text m-0">{value}</h2>
                  </span>
                  <input
                    type="radio"
                    name="trilha"
                    value={value}
                    className="w-[22px] h-[22px] accent-cq-primary cursor-pointer shrink-0"
                    checked={isSelected}
                    onChange={() => setSelectedTrilha(value)}
                  />
                </label>
              );
            })}
          </div>

          <nav className="flex justify-center mt-6 w-full" aria-label="Ação principal">
            <button
              className="btn-primary-cta"
              onClick={() => onFinish(selectedTrilha)}
              disabled={!selectedTrilha}
            >
              Começar jornada
            </button>
          </nav>
        </main>
      )}

    </div>
  );
}

export default Onboarding;
