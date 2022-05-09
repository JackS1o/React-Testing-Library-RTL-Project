import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se a página contém um heading h2 com o
    texto Page requested not found 😭`, () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/jdadsowd');

    const notFound = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = RenderWithRouter(<App />);

    history.push('/jdadsowd');

    const gifNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(gifNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
