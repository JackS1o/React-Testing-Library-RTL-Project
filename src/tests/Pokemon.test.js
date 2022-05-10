import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../helpers/RenderWithRouter';
import App from '../App';

describe(`Teste se é renderizado um card com as
  informações de determinado pokémon`, () => {
  it('O nome correto do pokémon deve ser mostrado na tela', () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });
  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(/fire/i);
  });
  it(`O peso médio do pokémon deve ser exibido com um texto
    no formato Average weight: <value> <measurementUnit>;
    onde <value> e <measurementUnit> são, respectivamente, o
    peso médio do pokémon e sua unidade de medida`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toBeInTheDocument();
  });
  it(`A imagem do pokémon deve ser exibida. Ela deve conter um atributo
    src com a URL da imagem e um atributo alt com o texto <name> sprite,
    onde <name> é o nome do pokémon`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonImg = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  it(`Teste se o card do pokémon indicado na Pokédex contém um
    link de navegação para exibir detalhes deste pokémon. O link deve
    possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });
  it(`Teste se ao clicar no link de navegação do pokémon, é feito o
    redirecionamento da aplicação para a página de detalhes de pokémon`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetails);
    const location = screen.getByRole('heading', {
      name: /game locations of charmander/i,
    });
    expect(location).toBeInTheDocument();
  });
  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
    onde <id> é o id do pokémon cujos detalhes se deseja ver`, () => {
    const { history } = RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });
});

describe('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
  it(`O ícone deve ser uma imagem com o atributo src contendo o
    caminho /star-icon.svg`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetails);
    const favCheck = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favCheck);
    const star = screen.getByRole('img', {
      name: /charmander is marked as favorite/i,
    });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
  it(`A imagem deve ter o atributo alt igual a <pokemon> is marked
    as favorite, onde <pokemon> é o nome do pokémon exibido`, () => {
    RenderWithRouter(<App />);

    const pokemonBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(pokemonBtn);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetails);
    screen.getByRole('checkbox', {
      checked: true,
    });
    const favPokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favPokemons);
    const star = screen.getByRole('img', {
      name: /charmander is marked as favorite/i,
    });
    expect(star).toBeInTheDocument();
  });
});
