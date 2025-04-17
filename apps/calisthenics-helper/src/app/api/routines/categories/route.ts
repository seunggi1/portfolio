import { NextResponse } from 'next/server';
import { RoutineCategory } from '@/types/routine';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { getRoutineCategories } from '@/business';

export async function GET() {
	let categories: RoutineCategory[];

	try {
		categories = await getRoutineCategories();
	} catch (error) {
		return handleErrorResponse(error as Error);
	}

	return NextResponse.json<RoutineCategory[]>(categories);
}
