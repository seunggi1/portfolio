import { NextRequest, NextResponse } from 'next/server';
import { getRecommandRoutines } from '@/business';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
	const type = request.nextUrl.searchParams.get('type');
	const url = request.nextUrl.clone();
	url.pathname = '/';
	url.searchParams.delete('type');

	if (type === null) {
		return NextResponse.redirect(url);
	}

	try {
		const data = await getRecommandRoutines();

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
