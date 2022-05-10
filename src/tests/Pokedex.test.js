import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(<App />);

    const h2El = screen.getAllByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2El[0]).toBeInTheDocument();
  });
});

describe(`Teste se é exibido o próximo pokémon da lista quando
  o botão Próximo pokémon é clicado`, () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    RenderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNext).toBeInTheDocument();
  });

  it(`Os próximos pokémons da lista devem ser mostrados, um a um,
    ao clicar sucessivamente no botão`, () => {
    RenderWithRouter(<App />);

    const allEl = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allEl);
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(btnNext);
    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
  });

  it(`O primeiro pokémon da lista deve ser mostrado ao clicar no
    botão, se estiver no último pokémon da lista`, () => {
    RenderWithRouter(<App />);

    const allEl = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allEl);
    const pokemon = screen.getAllByTestId(/pokemon-type-button/i);
    expect(pokemon[0]).toBeInTheDocument();

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    const pokemonEl = screen.getAllByTestId(/pokemon-type-button/i);
    expect(pokemonEl[0].textContent).toContain('Electric');
  });

  it('Teste se é mostrado apenas um pokémon por vez.', () => {
    RenderWithRouter(<App />);

    const pokemonType = screen.getAllByTestId(/pokemon-type/i);
    expect(pokemonType[0]).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it(`Deve existir um botão de filtragem para cada tipo
    de pokémon, sem repetição`, () => {
    RenderWithRouter(<App />);

    const filterAll = screen.getAllByRole('button', {
      name: /all/i,
    });
    const filterEl = screen.getAllByRole('button', {
      name: /electric/i,
    });
    const filterFi = screen.getAllByRole('button', {
      name: /fire/i,
    });
    const filterBug = screen.getAllByRole('button', {
      name: /bug/i,
    });
    const filterPoi = screen.getAllByRole('button', {
      name: /poison/i,
    });
    const filterPsy = screen.getAllByRole('button', {
      name: /psychic/i,
    });
    const filterNor = screen.getAllByRole('button', {
      name: /normal/i,
    });
    const filterDra = screen.getAllByRole('button', {
      name: /dragon/i,
    });

    expect(filterAll).toHaveLength(1);
    expect(filterEl).toHaveLength(1);
    expect(filterFi).toHaveLength(1);
    expect(filterBug).toHaveLength(1);
    expect(filterPoi).toHaveLength(1);
    expect(filterPsy).toHaveLength(1);
    expect(filterNor).toHaveLength(1);
    expect(filterDra).toHaveLength(1);
  });

  it(`A partir da seleção de um botão de tipo, a Pokédex deve
    circular somente pelos pokémons daquele tipo`, () => {
    RenderWithRouter(<App />);

    const typeBtn = screen.getByRole('button', {
      name: /bug/i,
    });
    userEvent.click(typeBtn);
    const pokemonType = screen.getAllByTestId(/pokemon-type/i);
    expect(pokemonType[0]).toHaveTextContent(/bug/i);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextBtn);
    expect(pokemonType[0]).toHaveTextContent(/bug/i);
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    RenderWithRouter(<App />);

    const typeBtn = screen.getByRole('button', {
      name: /poison/i,
    });
    userEvent.click(typeBtn);
    const typePokemon = screen.getAllByTestId(/pokemon-type/i);
    expect(typeBtn[0]).toEqual(typePokemon.textContent);
  });

  it('O botão All precisa estar sempre visível.', () => {
    RenderWithRouter(<App />);

    const pokemon = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(pokemon);
    const allEl = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allEl).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    RenderWithRouter(<App />);

    const allEl = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allEl).toHaveTextContent(/all/i);
  });

  it(`A Pokedéx deverá mostrar os pokémons normalmente (sem filtros)
    quando o botão All for clicado`, () => {
    RenderWithRouter(<App />);

    const allEl = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allEl);
    const pokemon = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemon).toBeInTheDocument();
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    RenderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    const pokemonEl = screen.getByText(/caterpie/i);
    expect(pokemonEl).toBeInTheDocument();
  });
});
