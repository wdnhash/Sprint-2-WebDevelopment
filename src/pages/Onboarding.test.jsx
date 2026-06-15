import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Onboarding from './Onboarding';

describe('<Onboarding /> (fluxo de integração)', () => {
  it('avança pelas etapas e conclui com a trilha escolhida', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(<Onboarding onFinish={onFinish} />);

    // Etapa 1: boas-vindas
    expect(screen.getByText('Bem-vindo ao CareQuest')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /começar minha jornada/i }));

    // Etapa 2: LGPD — o botão só habilita após aceitar
    const acceptBtn = screen.getByRole('button', { name: /aceitar e continuar/i });
    expect(acceptBtn).toBeDisabled();
    await user.click(screen.getByRole('checkbox'));
    expect(acceptBtn).toBeEnabled();
    await user.click(acceptBtn);

    // Etapa 3: escolha da trilha — concluir desabilitado até escolher
    const finishBtn = screen.getByRole('button', { name: /começar jornada/i });
    expect(finishBtn).toBeDisabled();
    await user.click(screen.getByText('Cuidar da mente'));
    expect(finishBtn).toBeEnabled();
    await user.click(finishBtn);

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith('Cuidar da mente');
  });
});
