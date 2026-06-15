import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Trails from './pages/Trails';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import { calcLevel, appendXpHistory, todayKey, canAfford } from './lib/gamification';

// Estado inicial do usuário — reutilizado no boot e ao sair da conta
const DEFAULT_USER_STATS = {
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
    return { ...DEFAULT_USER_STATS };
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
      return {
        ...prev,
        xp: newXp,
        level: calcLevel(newXp),
        carePoints: prev.carePoints + pointsEarned,
        completedMissions: missionId ? [...completed, missionId] : completed,
        xpHistory: appendXpHistory(prev.xpHistory || [], todayKey(), xpEarned, pointsEarned)
      };
    });
  };

  const claimReward = (rewardId, cost) => {
    setUserStats(prev => {
      if (!canAfford(prev.carePoints, cost)) return prev;
      return {
        ...prev,
        carePoints: prev.carePoints - cost,
        claimedRewards: [...(prev.claimedRewards || []), { id: rewardId, claimedAt: new Date().toISOString() }]
      };
    });
  };

  const registerCheckIn = (checkInData) => {
    const { reward = { xp: 0, pts: 0 }, ...rest } = checkInData;
    setUserStats(prev => {
      const newXp = prev.xp + reward.xp;
      return {
        ...prev,
        xp: newXp,
        level: calcLevel(newXp),
        carePoints: prev.carePoints + reward.pts,
        checkIns: [...(prev.checkIns || []).slice(-29), { ...rest, date: new Date().toISOString() }],
        xpHistory: appendXpHistory(prev.xpHistory || [], todayKey(), reward.xp, reward.pts)
      };
    });
  };

  const updateUser = (newData) => {
    setUserStats(prev => ({
      ...prev,
      ...newData
    }));
  };

  // Sair da conta: limpa a persistência e volta ao onboarding
  const logout = () => {
    localStorage.removeItem('careQuestData');
    setUserStats({ ...DEFAULT_USER_STATS });
  };

  // 4. Lógica para esconder a barra inferior no onboarding
  const hideBottomNav = location.pathname === '/onboarding';

  return (
    <div
      className={`min-h-screen ${hideBottomNav ? '' : 'pb-20 lg:pb-0 lg:pl-64'}`}
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
              ? <Profile userStats={userStats} onUpdateUser={updateUser} onCheckIn={registerCheckIn} onLogout={logout} />
              : <Navigate to="/onboarding" replace />
          }
        />

        {/* Qualquer rota desconhecida volta para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Rodapé global (oculto no onboarding para não competir com o fluxo) */}
      {!hideBottomNav && <Footer />}

      {/* Exibe a barra de navegação condicionalmente */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default App;