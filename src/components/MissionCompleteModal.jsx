function MissionCompleteModal({ xp, pts, onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      
      <div style={{ backgroundColor: '#fff', padding: '40px 20px', borderRadius: '30px', textAlign: 'center', width: '85%', maxWidth: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', animation: 'popIn 0.3s ease-out' }}>
        
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>🎉</div>
        <h2 style={{ color: '#00A859', fontSize: '24px', margin: '0 0 10px 0' }}>Missão Concluída!</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>
          Você deu mais um passo na sua jornada de saúde. Continue assim!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#E5F6ED', padding: '15px', borderRadius: '15px', flex: 1 }}>
            <h3 style={{ margin: 0, color: '#00A859', fontSize: '28px' }}>+{xp}</h3>
            <p style={{ margin: 0, color: '#00A859', fontSize: '12px', fontWeight: 'bold' }}>XP</p>
          </div>
          <div style={{ backgroundColor: '#FFF0ED', padding: '15px', borderRadius: '15px', flex: 1 }}>
            <h3 style={{ margin: 0, color: '#FF5A36', fontSize: '28px' }}>+{pts}</h3>
            <p style={{ margin: 0, color: '#FF5A36', fontSize: '12px', fontWeight: 'bold' }}>PTS</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{ width: '100%', padding: '15px', backgroundColor: '#00A859', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Incrível!
        </button>
      </div>

    </div>
  );
}

export default MissionCompleteModal;