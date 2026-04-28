import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import BottomNav from './components/layout/BottomNav';

function App() {
  const location = useLocation();

  // 1. Estado persistente com localStorage
  const [userStats, setUserStats] = useState(() => {
    try {
      const savedData = localStorage.getItem('careQuestData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error("Erro ao ler do localStorage", e);
    }
    
    // Retorna default em caso de erro ou sem dados
    return {
      name: "Wenderson", 
      level: 1,
      title: "Iniciante",
      carePoints: 0,
      xp: 0,
      streak: 0,
      hasCompletedOnboarding: false,
      trilha: null
    };
  });

  // 2. Sincroniza alterações no state com o navegador
  useEffect(() => {
    localStorage.setItem('careQuestData', JSON.stringify(userStats));
  }, [userStats]);

  // 3. Funções de manipulação do estado
  const finishOnboarding = (trilhaEscolhida) => {
    setUserStats(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      trilha: trilhaEscolhida
    }));
  };

  const completeMission = (xpEarned, pointsEarned) => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpEarned,
      carePoints: prev.carePoints + pointsEarned
    }));
  };

  const updateUser = (newData) => {
    setUserStats(prev => ({
      ...prev,
      ...newData
    }));
  };

  // 4. Lógica para esconder a barra inferior no onboarding
  const hideBottomNav = location.pathname === '/onboarding';

  return (
    <div style={{ minHeight: '100vh', paddingBottom: hideBottomNav ? '0' : '80px' }}>

      <Routes>
        {/* ROTA PÚBLICA / ONBOARDING */}
        <Route 
          path="/onboarding" 
          element={
            !userStats.hasCompletedOnboarding 
              ? <Onboarding onFinish={finishOnboarding} /> 
              : <Navigate to="/" replace />
          } 
        />

        {/* ROTAS PROTEGIDAS */}
        <Route 
          path="/" 
          element={
            userStats.hasCompletedOnboarding 
              ? <Home userStats={userStats} onComplete={completeMission} /> 
              : <Navigate to="/onboarding" replace />
          } 
        />
        
        <Route 
          path="/carteira" 
          element={
            userStats.hasCompletedOnboarding 
              ? <Wallet userStats={userStats} /> 
              : <Navigate to="/onboarding" replace />
          } 
        />
        
        <Route 
          path="/perfil" 
          element={
            userStats.hasCompletedOnboarding 
              ? <Profile userStats={userStats} onUpdateUser={updateUser} /> 
              : <Navigate to="/onboarding" replace />
          } 
        />
      </Routes>

      {/* Exibe a barra de navegação condicionalmente */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default App;