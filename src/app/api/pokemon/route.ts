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
