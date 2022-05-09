import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading', {
      name: 'About Pokédex', level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const a = /This application simulates a Pokédex/i;
    const b = /One can filter Pokémons by type/i;

    const pAbout = screen.getByText(a && b);
    expect(pAbout).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { history } = RenderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const imgAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(imgAbout.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
