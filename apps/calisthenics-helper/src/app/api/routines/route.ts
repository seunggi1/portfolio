import { NextRequest, NextResponse } from 'next/server';
import type {
	Routine,
	RoutinesRequest,
	RoutinesResponse,
} from '@/types/routine';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { validateFullRoutineData } from '@/schemas/routine';
import { ValidatorError } from '@/types/error';
import { createRoutineBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor: RoutinesRequest['nextCursor'] = searchParams.get('cursor');
	const categoryID = searchParams.get('category');
	const searchQuery = searchParams.get('search');
	let routines: RoutinesResponse | null;

	try {
		const routineBusiness = await createRoutineBusiness();
		routines = await routineBusiness.getRoutines({
			nextCursor: cursor,
			categoryID,
			searchQuery,
		});

		if (!routines) {
			throw new Error(serverHttpErrorMessages.SERVER_ERROR);
		}

		return NextResponse.json<RoutinesResponse>(routines);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

export async function POST(request: NextRequest) {
	const formData = await request.formData();

	const data = {
		...JSON.parse(formData.get('data')?.toString() ?? ''),
		image: formData.get('image'),
	};

	const inputError = validateFullRoutineData(data);
	if (inputError) {
		return handleErrorResponse(
			new ValidatorError(serverHttpErrorMessages.INPUT_ERROR)
		);
	}

	try {
		const routineBusiness = await createRoutineBusiness();
		const result = await routineBusiness.createRoutine(data);

		return NextResponse.json<Routine['id']>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
