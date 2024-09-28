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
