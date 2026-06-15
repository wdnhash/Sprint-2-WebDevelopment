import { describe, it, expect } from 'vitest';
import {
  calcLevel,
  levelProgress,
  todayKey,
  appendXpHistory,
  canAfford,
  XP_PER_LEVEL,
  MAX_HISTORY,
} from './gamification';

describe('calcLevel', () => {
  it('começa no nível 1 com 0 XP', () => {
    expect(calcLevel(0)).toBe(1);
  });

  it('mantém o nível 1 abaixo do limiar', () => {
    expect(calcLevel(99)).toBe(1);
  });

  it('sobe de nível ao atingir o múltiplo de XP_PER_LEVEL', () => {
    expect(calcLevel(XP_PER_LEVEL)).toBe(2);
    expect(calcLevel(250)).toBe(3);
  });
});

describe('levelProgress', () => {
  it('retorna 0 no início do nível', () => {
    expect(levelProgress(0)).toBe(0);
    expect(levelProgress(XP_PER_LEVEL)).toBe(0);
  });

  it('retorna o percentual dentro do nível atual', () => {
    expect(levelProgress(50)).toBe(50);
    expect(levelProgress(175)).toBe(75);
  });

  it('nunca passa de 100', () => {
    expect(levelProgress(99999)).toBeLessThanOrEqual(100);
  });
});

describe('todayKey', () => {
  it('formata a data como YYYY-MM-DD', () => {
    expect(todayKey(new Date('2026-05-15T10:30:00Z'))).toBe('2026-05-15');
  });
});

describe('appendXpHistory', () => {
  it('cria um registro novo quando o histórico está vazio', () => {
    expect(appendXpHistory([], '2026-05-15', 10, 5)).toEqual([
      { date: '2026-05-15', xp: 10, pts: 5 },
    ]);
  });

  it('agrega ganhos no mesmo dia', () => {
    const history = [{ date: '2026-05-15', xp: 10, pts: 5 }];
    expect(appendXpHistory(history, '2026-05-15', 20, 3)).toEqual([
      { date: '2026-05-15', xp: 30, pts: 8 },
    ]);
  });

  it('adiciona um novo dia sem alterar os anteriores', () => {
    const history = [{ date: '2026-05-15', xp: 10, pts: 5 }];
    const result = appendXpHistory(history, '2026-05-16', 7, 2);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({ date: '2026-05-16', xp: 7, pts: 2 });
  });

  it('mantém no máximo MAX_HISTORY registros', () => {
    let history = [];
    for (let i = 0; i < MAX_HISTORY + 10; i++) {
      history = appendXpHistory(history, `2026-01-${i}`, 1, 1);
    }
    expect(history).toHaveLength(MAX_HISTORY);
  });

  it('não muta o array original (imutabilidade)', () => {
    const history = [{ date: '2026-05-15', xp: 10, pts: 5 }];
    appendXpHistory(history, '2026-05-15', 5, 5);
    expect(history).toEqual([{ date: '2026-05-15', xp: 10, pts: 5 }]);
  });
});

describe('canAfford', () => {
  it('permite resgate quando há pontos suficientes', () => {
    expect(canAfford(100, 100)).toBe(true);
    expect(canAfford(150, 100)).toBe(true);
  });

  it('bloqueia resgate quando faltam pontos', () => {
    expect(canAfford(99, 100)).toBe(false);
  });
});
