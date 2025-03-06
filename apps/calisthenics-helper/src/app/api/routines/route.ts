import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import type { Routine, NewRoutine } from '@/types/routine';
import { handleErrorResponse } from '@/utils/error';
import { validateFullRoutineData } from '@/schemas/routine';
import { ValidatorError } from '@/types/error';

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

export async function POST(request: NextRequest) {
	const data = await request.json();
	console.log(data);
	const inputError = validateFullRoutineData(data);
	console.log(inputError);
	if (inputError) {
		return handleErrorResponse(new ValidatorError('Invalid input data'));
	}

	try {
		const client = await getServiceClient();
		const result = await client.createRoutine(data);

		return NextResponse.json<boolean>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
