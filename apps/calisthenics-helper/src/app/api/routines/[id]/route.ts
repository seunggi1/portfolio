import { NextRequest, NextResponse } from 'next/server';

import type { Routine, RoutineDetail } from '@/types/routine';
import { NotFoundError, ValidatorError } from '@/types/error';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { validateFullRoutineData } from '@/schemas/routine';
import { createRoutineBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	let routine: RoutineDetail | null = null;
	try {
		const id = (await params).id;
		const routineBusiness = await createRoutineBusiness();
		routine = await routineBusiness.getRoutineById(id);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}

	if (!routine) {
		return handleErrorResponse(
			new NotFoundError(serverHttpErrorMessages.NOT_FOUND_ERROR)
		);
	}

	return NextResponse.json<RoutineDetail>(routine);
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
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
		const id = (await params).id;
		const routineBusiness = await createRoutineBusiness();
		const result = await routineBusiness.updateRoutine({ ...data, id });

		return NextResponse.json<Routine['id']>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = (await params).id;
		const routineBusiness = await createRoutineBusiness();
		const result = await routineBusiness.deleteRoutine(id);

		return NextResponse.json<boolean>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
