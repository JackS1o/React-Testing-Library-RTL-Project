import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe(`Teste se as informações detalhadas do pokémon selecionado
  são mostradas na tela`, () => {
  it(`A página deve conter um texto <name> Details, onde <name> é
    o nome do pokémon`, () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const details = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(details).toBeInTheDocument();
  });
  it(`Não deve existir o link de navegação para os detalhes
    do pokémon selecionado`, () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const summary = screen.getByRole('heading', {
      name: /summary/i, level: 2,
    });
    expect(summary).toBeInTheDocument();
  });
  it(`A seção de detalhes deve conter um parágrafo com o resumo do
    pokémon específico sendo visualizado`, () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const text = screen.getByText(/This intelligent Pokémon roasts hard berries with/i);
    expect(text).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os mapas contendo as
  localizações do pokémon`, () => {
  const altImg = { name: 'Pikachu location' };
  it(`Na seção de detalhes deverá existir um heading h2 com o texto Game Locations
  of <name>; onde <name> é o nome do pokémon exibido`, () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const locations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locations).toBeInTheDocument();
  });
  it('Todas as localizações do pokémon devem ser mostradas na seção de detalhes', () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location1 && location2).toBeInTheDocument();
  });
  it(`Devem ser exibidos o nome da localização e uma imagem do mapa
    em cada localização`, () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    const img = screen.getAllByRole('img');
    expect(location1 && location2 && img[0] && img[1]).toBeInTheDocument();
  });
  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const img = screen.getAllByRole('img', altImg);
    expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it(`A imagem da localização deve ter um atributo alt com o texto <name> location,
    onde <name> é o nome do pokémon`, () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const img = screen.getAllByRole('img', altImg);
    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
  });
});

describe(`Teste se o usuário pode favoritar um pokémon através da
  página de detalhes`, () => {
  it('A página deve exibir um checkbox que permite favoritar o pokémon', () => {
    RenderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(check).toBeInTheDocument(check);
  });
  it(`Cliques alternados no checkbox devem adicionar e remover
    respectivamente o pokémon da lista de favoritos`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(check);
    screen.getByRole('checkbox', {
      checked: true,
    });
    const favPoke = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favPoke);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const check2 = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(check2);
    screen.getByRole('checkbox', {
      checked: false,
    });
    userEvent.click(screen.getByRole('link', {
      name: /favorite pokémons/i,
    }));
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
});
