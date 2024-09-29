import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
    );
    const data = await response.json();
    const pokemonList = data.results;
    for (const pokemon of pokemonList) {
      const res = await fetch(pokemon.url);
      const pokemonDetails = await res.json();
      await prisma.pokemon.create({
        data: {
          base_experience: pokemonDetails.base_experience,
          height: pokemonDetails.height,
          is_default: pokemonDetails.is_default,
          name: pokemonDetails.name,
          order: pokemonDetails.order,
          weight: pokemonDetails.weight,
          id: pokemonDetails.id,
          //   abilities: {
          //     connect: pokemonDetails.abilities.map((abilityData: any) => ({
          //       id: abilityData.ability.id,
          //     })),
          //   },
        },
      });
    }
    return NextResponse.json({
      success: true,
      message: 'database seeded successfully',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
