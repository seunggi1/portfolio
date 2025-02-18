import { getServiceClient } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id;
	const client = await getServiceClient();

	const routine = await client.getRoutineById(id);

	return NextResponse.json(routine);
}
