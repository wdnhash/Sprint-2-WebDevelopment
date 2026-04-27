import { useState } from 'react';
import mascoteImg from '../assets/images/mascote.png';
import './Onboarding.css';

function Onboarding({ onFinish }) {
  const [step, setStep] = useState(1);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [selectedTrilha, setSelectedTrilha] = useState(null);

  return (
    <div className="app-shell" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ETAPA 1: SPLASH / BOAS-VINDAS */}
      {step === 1 && (
        <main className="welcome-container">
          <header className="welcome__hero">
            <span className="welcome__halo" aria-hidden="true"></span>
            <img src={mascoteImg} alt="Mascote do CareQuest acenando." />
          </header>

          <section className="welcome__text">
            <h1>Bem-vindo ao CareQuest</h1>
            <p>Sua saúde é uma jornada, não um destino. Vamos conquistar hábitos saudáveis juntos, passo a passo.</p>
          </section>

          <nav className="d-flex justify-content-center w-100" aria-label="Ação principal">
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
        <main className="terms-container">
          <div className="terms__shield" aria-hidden="true">
            <i className="lni lni-shield-2-check"></i>
          </div>

          <header className="terms__heading">
            <h1>Seus dados, seu controle</h1>
            <p>Privacidade e transparência são pilares do CareQuest.</p>
          </header>

          <section className="terms__notice" aria-label="Aviso de privacidade">
            <p>Para criar sua jornada personalizada, precisamos processar algumas informações. Levamos sua privacidade a sério e seguimos
      rigorosamente a LGPD. Seus dados de saúde são usados exclusivamente para melhorar sua experiênciano CareQuest.</p>
          </section>

          <fieldset className="terms__form">
            <label className="checkbox-row" htmlFor="lgpd-consent">
              <input 
                type="checkbox" 
                id="lgpd-consent" 
                checked={lgpdAccepted} 
                onChange={(e) => setLgpdAccepted(e.target.checked)}
              />
              <span className="checkbox-row__text">
                Li e concordo com os <a href="#termos" onClick={(e) => e.preventDefault()}>Termos de Uso</a> e <a href="#privacidade"
      onClick={(e) => e.preventDefault()}>Política de Privacidade</a>. <br/>
                <strong>(Obrigatório)</strong>
              </span>
            </label>
          </fieldset>

          <nav className="terms__cta" aria-label="Ação principal">
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
        <main className="objective-container">
          <header className="objective__intro">
            <h1>O que você quer cuidar primeiro?</h1>
            <p>Escolha um objetivo para guiar suas missões.</p>
          </header>

          <div className="objective__list">
            
            {/* Opção 1: Sono */}
            <label className={`objective__option ${selectedTrilha === 'Dormir melhor' ? 'selected' : ''}`}>
              <span className="objective__option-content">
                <span className="objective__icon objective__icon--moon" aria-hidden="true">
                  <i className="fa-regular fa-moon"></i>
                </span>
                <h2>Dormir melhor</h2>
              </span>
              <input 
                type="radio" 
                name="trilha"
                value="Dormir melhor"
                checked={selectedTrilha === 'Dormir melhor'}
                onChange={() => setSelectedTrilha('Dormir melhor')}
              />
            </label>

            {/* Opção 2: Exercício */}
            <label className={`objective__option ${selectedTrilha === 'Mexer mais o corpo' ? 'selected' : ''}`}>
              <span className="objective__option-content">
                <span className="objective__icon objective__icon--body" aria-hidden="true">
                  <i className="lni lni-beat"></i>
                </span>
                <h2>Mexer mais o corpo</h2>
              </span>
              <input 
                type="radio" 
                name="trilha"
                value="Mexer mais o corpo"
                checked={selectedTrilha === 'Mexer mais o corpo'}
                onChange={() => setSelectedTrilha('Mexer mais o corpo')}
              />
            </label>

            {/* Opção 3: Mental */}
            <label className={`objective__option ${selectedTrilha === 'Cuidar da mente' ? 'selected' : ''}`}>
              <span className="objective__option-content">
                <span className="objective__icon objective__icon--brain" aria-hidden="true">
                  <i className="fa-solid fa-brain"></i>
                </span>
                <h2>Cuidar da mente</h2>
              </span>
              <input 
                type="radio" 
                name="trilha"
                value="Cuidar da mente"
                checked={selectedTrilha === 'Cuidar da mente'}
                onChange={() => setSelectedTrilha('Cuidar da mente')}
              />
            </label>

            {/* Opção 4: Alimentação */}
            <label className={`objective__option ${selectedTrilha === 'Me alimentar melhor' ? 'selected' : ''}`}>
              <span className="objective__option-content">
                <span className="objective__icon objective__icon--food" aria-hidden="true">
                  <i className="fa-solid fa-utensils"></i>
                </span>
                <h2>Me alimentar melhor</h2>
              </span>
              <input 
                type="radio" 
                name="trilha"
                value="Me alimentar melhor"
                checked={selectedTrilha === 'Me alimentar melhor'}
                onChange={() => setSelectedTrilha('Me alimentar melhor')}
              />
            </label>

          </div>

          <nav className="objective__cta" aria-label="Ação principal">
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