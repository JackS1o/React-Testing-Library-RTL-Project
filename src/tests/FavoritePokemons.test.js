import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibida na tela a mensagem No favorite
    pokemon found, caso a pessoa não tenha pokémons favoritos`, () => {
    const { history } = RenderWithRouter(<App />);

    const linkFav = screen.getByRole('link', {
      name: /Favorite pokémons/i,
    });
    userEvent.click(linkFav);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    RenderWithRouter(<App />);

    const addFav = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(addFav);
    const checkFav = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkFav);

    const linkFav = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFav);
    const imgFav = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imgFav.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
