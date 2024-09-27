'use client';

import { Pokemon } from '@/types/Pokemon';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
=======
import { FormEvent, useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import PokemonCard from './components/PokemonCard';
>>>>>>> fd3a74e2ff3d1432095a08f61aa55781fd2d5734

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const limit = 20;
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
<<<<<<< HEAD
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();
      setTotalResults(data.count);
=======
      setLoading(true);
      try {
        if (newSearch != '') {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${newSearch}`
          );
          if (!res.ok) {
            setSearchResults([]);
            throw new Error('Pokemon not found');
          }
          const data = await res.json();
          setSearchResults([data]);
          setTotalResults(1);
        } else {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
          );
>>>>>>> fd3a74e2ff3d1432095a08f61aa55781fd2d5734

          const data = await res.json();
          setTotalResults(data.count);

          const fetchPokemonDetails = data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            return res.json();
          });
          const pokemonDetails = await Promise.all(fetchPokemonDetails);
          setPokemons(pokemonDetails);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, [offset, newSearch]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewSearch(query);
  };

  const pokemonToShow = newSearch ? searchResults : pokemons;

  return (
    <main className="flex flex-col items-center">
      <h1 className="font-bold my-5 text-2xl text-teal-800">PokeDex v2</h1>
      <div>
        <form onSubmit={handleSearch}>
          <input
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
<<<<<<< HEAD
      <Pagination
        limit={limit}
        offset={offset}
        setOffset={setOffset}
        totalResults={totalResults}
=======
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {pokemonToShow.length === 0 ? (
              <p>No Pokemon found</p>
            ) : (
              <ul className="flex flex-wrap">
                {pokemonToShow.map((pokemon: Pokemon) => (
                  <li key={pokemon.id}>
                    <PokemonCard pokemon={pokemon} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <Pagination
        limit={limit}
        offset={offset}
        totalResults={totalResults}
        setOffset={setOffset}
        loading={loading}
>>>>>>> fd3a74e2ff3d1432095a08f61aa55781fd2d5734
      />
    </main>
  );
}
