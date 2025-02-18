import { getServiceClient } from '@/services';
import { NextResponse } from 'next/server';

export async function GET() {
	const client = await getServiceClient();
	const routines = await client.getRoutines(1);

	return NextResponse.json(routines);
}
