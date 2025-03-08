import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import type { RoutineDetail } from '@/types/routine';
import { NotFoundError, ValidatorError } from '@/types/error';
import { handleErrorResponse } from '@/utils/error';
import { validateFullRoutineData } from '@/schemas/routine';

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	let routine: RoutineDetail | null = null;
	try {
		const id = (await params).id;
		const client = await getServiceClient();
		routine = await client.getRoutineById(id);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}

	if (!routine) {
		return handleErrorResponse(new NotFoundError('routine not found'));
	}

	return NextResponse.json<RoutineDetail>(routine);
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const data = await request.json();
	const inputError = validateFullRoutineData(data);

	if (inputError) {
		return handleErrorResponse(new ValidatorError('Invalid input data'));
	}

	try {
		const id = (await params).id;
		const client = await getServiceClient();
		const result = await client.updateRoutine({ ...data, id });

		return NextResponse.json<boolean>(result);
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
		const client = await getServiceClient();
		const result = await client.deleteRoutine(id);
		return NextResponse.json<boolean>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
