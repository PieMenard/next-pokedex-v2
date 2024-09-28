import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ability = await prisma.ability.create({
      data: {
        id: data.id,
        is_main_series: data.is_main_series,
        language: data.language,
        name: data.name,
      },
    });
    return NextResponse.json({ success: true, data: ability });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
