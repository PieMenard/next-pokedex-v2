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
