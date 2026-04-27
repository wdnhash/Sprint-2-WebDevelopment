import { useState } from 'react';
import MissionCompleteModal from '../components/MissionCompleteModal';

function Home({ userStats, onComplete }) {
  const { name, streak, level, title } = userStats;
  const [modalData, setModalData] = useState(null);

  // Array de missões simulando dados que viriam de uma API/Edge Computing
  const dailyMissions = [
    { id: 1, type: "MOVIMENTO NA ROTINA", title: "Caminhar 15 minutos", desc: "Dê uma volta no quarteirão ou caminhe...", xp: 20, pts: 15 },
    { id: 2, type: "ALIMENTAÇÃO MELHOR", title: "Beber 2L de água", desc: "Mantenha-se hidratado ao longo do dia.", xp: 15, pts: 10 },
    { id: 3, type: "MENTE TRANQUILA", title: "Meditação de 5 min", desc: "Tire um momento para respirar fundo.", xp: 30, pts: 25 },
  ];

  const handleMissionClick = (xp, pts) => {
    onComplete(xp, pts); // Atualiza o estado global no App.jsx (salva no localStorage)
    setModalData({ xp, pts }); // Abre o modal de feedback
  };

  return (
    <main style={{ padding: '20px' }}>
      {/* CABEÇALHO DO USUÁRIO */}
      <header style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Olá, {name}</p>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Vamos nos cuidar?</h2>
          <p style={{ margin: '10px 0 0 0', color: '#00A859', fontWeight: 'bold', fontSize: '14px' }}>Nível {level} <span style={{ color: '#666', fontWeight: 'normal' }}>- {title}</span></p>
        </div>
        <div style={{ backgroundColor: '#FFF0ED', color: '#FF5A36', padding: '8px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
          🔥 {streak} dias
        </div>
      </header>

      <h3>Missões de hoje</h3>

      {/* LISTA DE MISSÕES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {dailyMissions.map((mission) => (
          <div key={mission.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#00A859', backgroundColor: '#E5F6ED', padding: '4px 8px', borderRadius: '10px', marginRight: '5px' }}>DIÁRIA</span>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#00A859', backgroundColor: '#E5F6ED', padding: '4px 8px', borderRadius: '10px' }}>{mission.type}</span>
              <h4 style={{ margin: '10px 0 5px 0' }}>{mission.title}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{mission.desc}</p>
            </div>
            
            <button 
              onClick={() => handleMissionClick(mission.xp, mission.pts)}
              style={{ backgroundColor: '#E8F5E9', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer', textAlign: 'center', minWidth: '70px' }}
            >
              <div style={{ color: '#00A859', fontWeight: 'bold' }}>+{mission.xp} XP</div>
              <div style={{ color: '#88C057', fontSize: '12px' }}>+{mission.pts} pts</div>
            </button>
          </div>
        ))}
      </div>

      {/* RENDERIZA O MODAL SE TIVER DADOS */}
      {modalData && (
        <MissionCompleteModal 
          xp={modalData.xp} 
          pts={modalData.pts} 
          onClose={() => setModalData(null)} 
        />
      )}
    </main>
  );
}

export default Home;