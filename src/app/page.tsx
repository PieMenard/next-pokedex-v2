'use client';

import { Pokemon } from '@/types/Pokemon';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import { off } from 'process';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const limit = 20;
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();
      setTotalResults(data.count);

      const fetchPokemonDetails = data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        return res.json();
      });
      const pokemonDetails = await Promise.all(fetchPokemonDetails);
      setPokemons(pokemonDetails);
    };
    fetchPokemonList();
  }, [offset]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="font-bold my-5 text-2xl text-teal-800">PokeDex v2</h1>
      <div>
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.id}>
              {pokemon.id}. {pokemon.name}
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        limit={limit}
        offset={offset}
        totalResults={totalResults}
        setOffset={setOffset}
      />
    </main>
  );
}
