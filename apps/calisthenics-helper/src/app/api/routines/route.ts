import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import type { Routine } from '@/types/routine';
import { handleErrorResponse } from '@/utils/error';

export async function GET(request: NextRequest) {
	const page: number = +(request.nextUrl.searchParams.get('page') || 1);
	let routines: Routine[];

	try {
		const client = await getServiceClient();
		routines = await client.getRoutines(page);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}

	return NextResponse.json<Routine[]>(routines);
}
