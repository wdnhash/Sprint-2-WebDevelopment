import { useState } from 'react';
import MissionCompleteModal from '../components/MissionCompleteModal';
import mascoteImg from '../assets/images/mascote.png';
import './Home.css';

function Home({ userStats, onComplete }) {
  const { name, streak, level, title, xp } = userStats;
  const [modalData, setModalData] = useState(null);

  // Calcula porcentagem do progresso de xp proximo nível (simulado que cada nível custa 100xp)
  const xpProgress = Math.min((xp % 100) / 100 * 100, 100);

  // Array de missões simulando dados que viriam de uma API
  const dailyMissions = [
    { id: 1, type: "MOVIMENTO NA ROTINA", chipColor: "chip--green", title: "Caminhar 15 minutos", desc: "Dê uma volta no quarteirão ou caminhe pela casa.", xp: 20, pts: 15 },
    { id: 2, type: "ALIMENTAÇÃO MELHOR", chipColor: "chip--red", title: "Beber 2L de água", desc: "Mantenha-se hidratado ao longo do dia.", xp: 15, pts: 10 },
    { id: 3, type: "MENTE TRANQUILA", chipColor: "chip--purple", title: "Meditação de 5 min", desc: "Tire um momento para respirar fundo.", xp: 30, pts: 25 },
  ];

  const handleMissionClick = (xpEarned, ptsEarned) => {
    onComplete(xpEarned, ptsEarned); 
    setModalData({ xp: xpEarned, pts: ptsEarned }); 
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* CABEÇALHO DO USUÁRIO */}
      <header className="missions__header">
        <div className="missions__header-top">
          <div className="missions__header-identity">
            <div className="missions__avatar">
              <img src={mascoteImg} alt="Avatar do mascote" />
            </div>
            <div className="missions__greeting">
              <p>Olá, {name}</p>
              <h1>Vamos nos cuidar?</h1>
            </div>
          </div>
          <span className="missions__streak" aria-label={`Sequência atual de ${streak} dias`}>
            <i className="fa-solid fa-fire" aria-hidden="true"></i>
            {streak} dias
          </span>
        </div>

        <div className="missions__progress">
          <div className="missions__progress-text">
            <span className="level">Nível {level}</span>
            <span className="classification">{title}</span>
          </div>
          <div className="missions__progress-bar" role="progressbar" aria-valuenow={xpProgress} aria-valuemin="0" aria-valuemax="100">
            <span style={{ width: `${xpProgress}%` }}></span>
          </div>
        </div>
      </header>

      <main className="missions__main">
        <h2>Missões de hoje</h2>

        {/* LISTA DE MISSÕES */}
        <div className="missions__list">
          {dailyMissions.map((mission) => (
            <button 
              key={mission.id} 
              className="mission-card"
              onClick={() => handleMissionClick(mission.xp, mission.pts)}
              aria-label={`Missão diária: ${mission.title}. +${mission.xp} XP, +${mission.pts} pontos.`}
            >
              <div className="mission-card__body">
                <div className="mission-card__chips">
                  <span className="chip">Diária</span>
                  <span className={`chip ${mission.chipColor}`}>{mission.type}</span>
                </div>
                <h3 className="mission-card__title">{mission.title}</h3>
                <p className="mission-card__desc">{mission.desc}</p>
              </div>
              <div className="mission-card__rewards">
                <span className="mission-card__xp">+{mission.xp} XP</span>
                <span className="mission-card__pts">+{mission.pts} pts</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* RENDERIZA O MODAL SE TIVER DADOS */}
      {modalData && (
        <MissionCompleteModal 
          xp={modalData.xp} 
          pts={modalData.pts} 
          onClose={() => setModalData(null)} 
        />
      )}
    </div>
  );
}

export default Home;