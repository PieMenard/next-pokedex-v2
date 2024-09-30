import { cn } from '@/lib/utils';
import { Pokemon } from '@/types/Pokemon';
import { TypeData } from '@/types/Type';
import Image from 'next/image';
cn;

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  let imageId = pokemon.id.toString();
  if (imageId.length === 1) {
    imageId = '00' + pokemon.id.toString();
  } else if (imageId.length === 2) {
    imageId = '0' + pokemon.id.toString();
  } else if (imageId.length > 4) {
    imageId = '0000';
  }
  return (
    <div className="w-[250px] h-[350px] border-2 border-gra rounded-md m-3 bg-gray-100">
      <div className="flex justify-between px-3 my-2 border-b-2 border-teal-600 py-2 font-semibold ">
        <h1>{pokemon.id}</h1>
        <h1>{pokemon.name.toUpperCase()}</h1>
      </div>
      <Image
        src={
          imageId != '0000'
            ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`
            : '/no-image.png'
        }
        alt={imageId}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full max-h-[200px] object-cover rounded-md px-1 "
      />
      <div className="text-center py-2">
        {pokemon.types.map((item: TypeData) => (
          <p
            key={item.type.name}
            className={cn(
              'rounded-lg text-white mx-8 my-1 bg-slate-400',
              item.type.name === 'grass' && 'bg-green-600',
              item.type.name === 'fire' && 'bg-orange-700',
              item.type.name === 'poison' && 'bg-purple-600',
              item.type.name === 'water' && 'bg-sky-500',
              item.type.name === 'bug' && 'bg-indigo-700'
            )}
          >
            {item.type.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
