import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';

export const revalidate = 60 * 60;

export async function GET(request: NextRequest) {
	const type = request.nextUrl.searchParams.get('type');

	if (type === null) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	try {
		const client = await getServiceClient();
		const data = await client.getRecommandRoutines(new Date().getDay());

		const routine = data.find((r) => r.exerciseType === +type);
		if (!data.length || !routine) {
			throw new Error();
		}

		return NextResponse.redirect(
			new URL(`/routines/${routine.routineID}`, request.url)
		);
	} catch {
		return NextResponse.redirect(new URL('/', request.url));
	}
}
