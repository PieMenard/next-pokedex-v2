import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/pokemon/')[1]);
    const pokemon = await prisma.pokemon.findUnique({
      where: { id },
      include: {
        abilities: true,
      },
    });

    if (!pokemon) {
      {
        return NextResponse.json(
          { success: false, error: 'Not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ success: true, data: pokemon });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const id = parseInt(req.url.split('/pokemon/')[1]);

    if (data.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot update the id' },
        { status: 400 }
      );
    }

    const existingPokemon = await prisma.pokemon.findUnique({
      where: { id },
      include: { abilities: true },
    });
    if (!existingPokemon) {
      return NextResponse.json({ success: false, error: 'Not found' });
    }

    const currentAbilitiesIds = existingPokemon.abilities.map(
      (ability) => ability.id
    );

    const newAbilitiesIds = data.abilities.map(
      (abilityData: any) => abilityData.ability.id
    );

    const abilitiesToConnect = newAbilitiesIds.filter(
      (id: number) => !currentAbilitiesIds.includes(id)
    );

    const abilitiesToDisconnect = currentAbilitiesIds.filter(
      (id: number) => !newAbilitiesIds.includes(id)
    );

    const pokemon = await prisma.pokemon.update({
      where: { id },
      data: {
        base_experience: data.base_experience,
        height: data.height,
        is_default: data.is_default,
        name: data.name,
        order: data.order,
        weight: data.weight,
        abilities: {
          connect: abilitiesToConnect.map((abilityId: number) => ({
            id: abilityId,
          })),
          disconnect: abilitiesToDisconnect.map((abilityId: number) => ({
            id: abilityId,
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
