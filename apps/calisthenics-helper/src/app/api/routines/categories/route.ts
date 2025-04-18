import { NextResponse } from 'next/server';
import { RoutineCategory } from '@/types/routine';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { createRoutineBusiness } from '@/business';

export async function GET() {
	let categories: RoutineCategory[];

	try {
		const routineBusiness = await createRoutineBusiness();
		categories = await routineBusiness.getRoutineCategories();
	} catch (error) {
		return handleErrorResponse(error as Error);
	}

	return NextResponse.json<RoutineCategory[]>(categories);
}
