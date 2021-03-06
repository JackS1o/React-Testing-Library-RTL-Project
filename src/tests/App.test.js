import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    RenderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeDefined();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeDefined();

    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFav).toBeDefined();
  });

  it(`Teste se a aplicação é redirecionada para a
    página inicial, na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = RenderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página
      de About, na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons
      Favoritados, na URL /favorites, ao clicar no link Favorite
      Pokémons da barra de navegação.`, () => {
    const { history } = RenderWithRouter(<App />);

    const linkFav = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(linkFav);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página
    Not Found ao entrar em uma URL desconhecida`, () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/hddd');

    const notFound = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
    });
    expect(notFound).toBeDefined();
  });
});
