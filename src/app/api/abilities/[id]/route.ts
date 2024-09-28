import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/abilities/')[1]);
    const ability = await prisma.ability.findUnique({
      where: { id },
    });
    if (!ability) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: ability });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/abilities/')[1]);
    const newData = await req.json();

    if (newData.id) {
      return NextResponse.json({ success: false, error: 'Cannot update id' });
    }

    const ability = await prisma.ability.update({
      where: { id },
      data: {
        is_main_series: newData.is_main_series,
        language: newData.language,
        name: newData.name,
      },
    });

    return NextResponse.json({ success: true, data: ability });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
