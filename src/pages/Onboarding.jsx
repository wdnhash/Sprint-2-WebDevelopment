import { useState } from 'react';
import mascoteImg from '../assets/images/mascote.png'; // Importando a imagem
import './Onboarding.css'; // Importando os estilos

function Onboarding({ onFinish }) {
    const [step, setStep] = useState(1);
    const [lgpdAccepted, setLgpdAccepted] = useState(false);
    const [selectedTrilha, setSelectedTrilha] = useState(null);

    return (
        <div className="app-shell" style={{ backgroundColor: '#F5F7FA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
                <div style={{ padding: '40px 20px', flex: 1 }}>
                    <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Privacidade e Termos</h2>
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>
                        Para personalizar sua experiência, precisamos de algumas permissões. Seus dados são anônimos e você está no controle.
                    </p>

                    <div style={{ backgroundColor: '#F4F7FB', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                        <input
                            type="checkbox"
                            id="lgpd"
                            checked={lgpdAccepted}
                            onChange={(e) => setLgpdAccepted(e.target.checked)}
                            style={{ width: '20px', height: '20px', marginTop: '3px' }}
                        />
                        <label htmlFor="lgpd" style={{ fontSize: '14px', color: '#333' }}>
                            <strong>Uso de Dados de Saúde</strong><br />
                            Aceito compartilhar dados de passos e sono para concluir missões diárias (LGPD).
                        </label>
                    </div>

                    <button
                        onClick={() => setStep(3)}
                        disabled={!lgpdAccepted}
                        style={{ width: '100%', padding: '15px', backgroundColor: lgpdAccepted ? '#00A859' : '#ccc', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', cursor: lgpdAccepted ? 'pointer' : 'not-allowed', marginTop: '20px' }}
                    >
                        Continuar
                    </button>
                </div>
            )}

            {/* ETAPA 3: ESCOLHA DA TRILHA */}
            {step === 3 && (
                <div style={{ padding: '40px 20px', flex: 1 }}>
                    <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>Qual seu foco inicial?</h2>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>Escolha uma trilha para guiar suas missões.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {['Movimento na Rotina', 'Alimentação Melhor', 'Mente Tranquila'].map((trilha) => (
                            <div
                                key={trilha}
                                onClick={() => setSelectedTrilha(trilha)}
                                style={{ padding: '20px', border: selectedTrilha === trilha ? '2px solid #00A859' : '2px solid #eee', borderRadius: '15px', backgroundColor: selectedTrilha === trilha ? '#E5F6ED' : '#fff', cursor: 'pointer', fontWeight: 'bold', color: '#333' }}
                            >
                                {trilha}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => onFinish(selectedTrilha)}
                        disabled={!selectedTrilha}
                        style={{ width: '100%', padding: '15px', backgroundColor: selectedTrilha ? '#00A859' : '#ccc', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', cursor: selectedTrilha ? 'pointer' : 'not-allowed', marginTop: '40px' }}
                    >
                        Finalizar e Ir para a Home
                    </button>
                </div>
            )}

        </div>
    );
}

export default Onboarding;