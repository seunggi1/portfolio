import { NextRequest, NextResponse } from 'next/server';
import { RoutinesByUserRequest, RoutinesResponse } from '@/types/routine';
import { handleErrorResponse } from '@/utils/error';
import { getServiceClient } from '@/services';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor: RoutinesByUserRequest['nextCursor'] =
		searchParams.get('cursor');
	let routines: RoutinesResponse | null;

	try {
		const client = await getServiceClient();
		routines = await client.getRoutinesByUser({
			nextCursor: cursor,
		});

		if (!routines) {
			throw new Error('Server Error');
		}

		return NextResponse.json<RoutinesResponse>(routines);
	} catch (error) {
		console.log(error);
		return handleErrorResponse(error as Error);
	}
}
