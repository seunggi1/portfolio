import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';

export const revalidate = 60 * 60;

export async function GET(request: NextRequest) {
	const type = request.nextUrl.searchParams.get('type');
	const url = request.nextUrl.clone();
	url.pathname = '/';
	url.searchParams.delete('type');

	if (type === null) {
		return NextResponse.redirect(url);
	}

	try {
		const client = await getServiceClient();
		const data = await client.getRecommandRoutines(new Date().getDay());

		const routine = data.find((r) => r.exerciseType === +type);

		if (!data.length || !routine) {
			url.pathname = '/404';
			return NextResponse.redirect(url);
		}

		url.pathname = `/routines/${routine.routineID}`;

		return NextResponse.redirect(url);
	} catch {
		return NextResponse.redirect(url);
	}
}
