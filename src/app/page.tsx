'use client';

import { useEffect, useState } from 'react';
import SinglePokemon from './components/SinglePokemon';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        );
        const data = await res.json();
        setPokemons(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemonList();
  }, []);

  return (
    <main>
      <div>
        <ul>
          {pokemons.map((pokemon: any) => (
            <li key={pokemon.url}>
              <SinglePokemon url={pokemon.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
