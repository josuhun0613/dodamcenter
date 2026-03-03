import { NextRequest, NextResponse } from 'next/server';
import { update } from '@/lib/storage';
import { Inquiry } from '@/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updated = await update<Inquiry>('inquiries', id, body);
  if (!updated) {
    return NextResponse.json({ error: '문의를 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(updated);
}
