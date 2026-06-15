const BASE_URL = '/api';

async function fetchJSON(path) {
  const response = await fetch(`${BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar /${path} (status ${response.status})`);
  }
  return response.json();
}

export const getMissions = () => fetchJSON('missions.json');
export const getRewards = () => fetchJSON('rewards.json');
export const getTrails = () => fetchJSON('trails.json');
export const getAchievements = () => fetchJSON('achievements.json');
