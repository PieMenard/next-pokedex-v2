'use client';

import { Pokemon } from '@/types/Pokemon';
import { useEffect, useState } from 'react';

const SinglePokemon = ({ url }: { url: string }) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data) setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, []);
  return <div>{pokemon?.name}</div>;
};

export default SinglePokemon;
