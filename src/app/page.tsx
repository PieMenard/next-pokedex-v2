'use client';

import { Pokemon } from '@/types/Pokemon';
import { FormEvent, useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import PokemonCard from './components/PokemonCard';
import SearchBox from './components/SearchBox';

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
      <SearchBox
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
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
      />
    </main>
  );
}
