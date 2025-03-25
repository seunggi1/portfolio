import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import type {
	Routine,
	RoutinesRequest,
	RoutinesResponse,
} from '@/types/routine';
import { handleErrorResponse } from '@/utils/error';
import { validateFullRoutineData } from '@/schemas/routine';
import { ValidatorError } from '@/types/error';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor: RoutinesRequest['nextCursor'] = searchParams.get('cursor');
	const categoryID = searchParams.get('category');
	const searchQuery = searchParams.get('search');
	let routines: RoutinesResponse | null;

	try {
		const client = await getServiceClient();
		routines = await client.getRoutines({
			nextCursor: cursor,
			categoryID,
			searchQuery,
		});

		if (!routines) {
			throw new Error('Server Error');
		}

		return NextResponse.json<RoutinesResponse>(routines);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const inputError = validateFullRoutineData(data);
	if (inputError) {
		return handleErrorResponse(new ValidatorError('Invalid input data'));
	}

	try {
		const client = await getServiceClient();
		const result = await client.createRoutine(data);

		return NextResponse.json<Routine['id']>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
