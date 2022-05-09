import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe(`Teste se o topo da aplicação contém um
    conjunto fixo de links de navegação.`, () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeDefined();
  });

  it('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeDefined();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);

    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFav).toBeDefined();
  });
});
