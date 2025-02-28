import { NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import { RoutineCategory } from '@/types/routine';
import { handleErrorResponse } from '@/utils/error';

export async function GET() {
	let categories: RoutineCategory[];

	try {
		const client = await getServiceClient();
		categories = await client.getRoutineCategories();
	} catch (error) {
		return handleErrorResponse(error as Error);
	}

	return NextResponse.json<RoutineCategory[]>(categories);
}
