import { Pokemon } from '@/types/Pokemon';
import { TypeData } from '@/types/Type';
import Image from 'next/image';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  let image_id = '0000';
  if (pokemon.id < 10) {
    image_id = '00' + pokemon.id.toString();
  } else if (pokemon.id < 100) {
    image_id = '0' + pokemon.id.toString();
  }
  return (
    <div className="w-[250px] h-[350px] border-2 rounded-md m-3">
      <div className="flex justify-between px-3 my-2 border-b-2 py-2 font-semibold">
        <h1>{pokemon.id}</h1>
        <h1>{pokemon.name.toUpperCase()}</h1>
      </div>
      <Image
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${image_id}.png`}
        alt={pokemon.name}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full max-h-[200px] object-cover rounded-md px-1 "
      />
      <div className="text-center py-2">
        {pokemon.types.map((item: TypeData) => (
          <p key={item.type.name}>{item.type.name}</p>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
