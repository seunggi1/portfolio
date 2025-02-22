import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import type { RoutineDetail } from '@/types/routine';
import { NotFoundError } from '@/types/error';
import { handleErrorResponse } from '@/utils/error';

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
