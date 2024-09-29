import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const pokemon = await prisma.pokemon.create({
      data: {
        base_experience: data.base_experience,
        height: data.height,
        is_default: data.is_default,
        name: data.name,
        order: data.order,
        weight: data.weight,
        id: data.id,
        abilities: {
          connect: data.abilities.map((abilityData: any) => ({
            id: abilityData.ability.id,
          })),
        },
      },
      include: { abilities: true },
    });

    return NextResponse.json({ success: true, data: pokemon });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const idSearch = searchParams.get('id');
    const weightSearch = searchParams.get('weight');
    const nameSearch = searchParams.get('name');
    const abilitySearch = searchParams.get('ability');
    const heightSearch = searchParams.get('height');

    const filters: any = {};

    if (idSearch) {
      filters.id = parseInt(idSearch);
    }
    if (weightSearch) {
      filters.weight = parseInt(weightSearch);
    }
    if (nameSearch) {
      filters.name = { contains: nameSearch, mode: 'insensitive' };
    }
    if (abilitySearch) {
      filters.abilities = {
        some: {
          name: {
            contains: abilitySearch,
            mode: 'insensitive',
          },
        },
      };
    }
    if (heightSearch) {
      filters.height = parseInt(heightSearch);
    }

    const pokemonList = await prisma.pokemon.findMany({
      where: filters,
      select: {
        name: true,
        id: true,
      },
      take: limit,
      skip: offset,
    });

    if (pokemonList.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No pokemon found' },
        { status: 404 }
      );
    }
    const results = {
      offset: offset,
      limit: limit,
      results: pokemonList,
    };

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
