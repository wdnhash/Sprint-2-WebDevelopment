import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renderiza a marca CareQuest', () => {
    render(<Footer />);
    expect(screen.getByText('CareQuest')).toBeInTheDocument();
  });

  it('expõe os links de repositório e protótipo', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /reposit/i })).toHaveAttribute('href');
    expect(screen.getByRole('link', { name: /prot/i })).toHaveAttribute('href');
  });

  it('mostra o ano corrente no copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('usa a landmark de rodapé (contentinfo)', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
