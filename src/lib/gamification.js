// Lógica pura de gamificação do CareQuest.
// Sem dependência de React/DOM — facilita o teste unitário isolado.

export const XP_PER_LEVEL = 100;
export const MAX_HISTORY = 30;

/**
 * Calcula o nível a partir do XP acumulado.
 * Nível 1 começa em 0 XP; cada XP_PER_LEVEL de XP sobe um nível.
 */
export function calcLevel(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

/**
 * Percentual (0–100) de progresso dentro do nível atual.
 */
export function levelProgress(xp) {
  return Math.min((xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100, 100);
}

/**
 * Chave de data no formato YYYY-MM-DD, usada para agregar o histórico por dia.
 */
export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

/**
 * Adiciona ganhos de XP/pontos ao histórico diário.
 * Se já existir um registro para o mesmo dia (o último), agrega os valores;
 * caso contrário cria um novo registro. Mantém apenas os últimos MAX_HISTORY.
 */
export function appendXpHistory(history = [], date, xp, pts) {
  const last = history[history.length - 1];
  const updated = last && last.date === date
    ? [...history.slice(0, -1), { date, xp: last.xp + xp, pts: last.pts + pts }]
    : [...history, { date, xp, pts }];
  return updated.slice(-MAX_HISTORY);
}

/**
 * Indica se o usuário tem pontos suficientes para resgatar uma recompensa.
 */
export function canAfford(carePoints, cost) {
  return carePoints >= cost;
}
