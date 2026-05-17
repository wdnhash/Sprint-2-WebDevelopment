import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Trails from './pages/Trails';
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
      trilha: null,
      completedMissions: [],
      claimedRewards: [],
      xpHistory: [],
      checkIns: []
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

  const completeMission = (xpEarned, pointsEarned, missionId = null) => {
    setUserStats(prev => {
      const completed = prev.completedMissions || [];
      if (missionId && completed.includes(missionId)) {
        return prev;
      }
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.floor(newXp / 100) + 1;
      const today = new Date().toISOString().slice(0, 10);
      const history = prev.xpHistory || [];
      const lastEntry = history[history.length - 1];
      const updatedHistory = lastEntry && lastEntry.date === today
        ? [...history.slice(0, -1), { date: today, xp: lastEntry.xp + xpEarned, pts: lastEntry.pts + pointsEarned }]
        : [...history, { date: today, xp: xpEarned, pts: pointsEarned }];

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        carePoints: prev.carePoints + pointsEarned,
        completedMissions: missionId ? [...completed, missionId] : completed,
        xpHistory: updatedHistory.slice(-30)
      };
    });
  };

  const claimReward = (rewardId, cost) => {
    setUserStats(prev => {
      if (prev.carePoints < cost) return prev;
      return {
        ...prev,
        carePoints: prev.carePoints - cost,
        claimedRewards: [...(prev.claimedRewards || []), { id: rewardId, claimedAt: new Date().toISOString() }]
      };
    });
  };

  const registerCheckIn = (checkInData) => {
    const { reward = { xp: 0, pts: 0 }, ...rest } = checkInData;
    const today = new Date().toISOString().slice(0, 10);
    setUserStats(prev => {
      const newXp = prev.xp + reward.xp;
      const newLevel = Math.floor(newXp / 100) + 1;
      const history = prev.xpHistory || [];
      const lastEntry = history[history.length - 1];
      const updatedHistory = lastEntry && lastEntry.date === today
        ? [...history.slice(0, -1), { date: today, xp: lastEntry.xp + reward.xp, pts: lastEntry.pts + reward.pts }]
        : [...history, { date: today, xp: reward.xp, pts: reward.pts }];

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        carePoints: prev.carePoints + reward.pts,
        checkIns: [...(prev.checkIns || []).slice(-29), { ...rest, date: new Date().toISOString() }],
        xpHistory: updatedHistory.slice(-30)
      };
    });
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
    <div
      className={hideBottomNav ? '' : 'lg:pl-64'}
      style={{ minHeight: '100vh', paddingBottom: hideBottomNav ? '0' : '80px' }}
    >

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
              ? <Wallet userStats={userStats} onClaimReward={claimReward} />
              : <Navigate to="/onboarding" replace />
          }
        />
        
        <Route
          path="/trilhas"
          element={
            userStats.hasCompletedOnboarding
              ? <Trails userStats={userStats} />
              : <Navigate to="/onboarding" replace />
          }
        />

        <Route
          path="/perfil"
          element={
            userStats.hasCompletedOnboarding
              ? <Profile userStats={userStats} onUpdateUser={updateUser} onCheckIn={registerCheckIn} />
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