'use client';

import { Pokemon } from '@/types/Pokemon';
import { useEffect, useState } from 'react';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      );
      const data = await res.json();

      const fetchPokemonDetails = data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        return res.json();
      });
      const pokemonDetails = await Promise.all(fetchPokemonDetails);
      setPokemons(pokemonDetails);
    };
    fetchPokemonList();
  }, []);

  return (
    <main>
      <div>
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
