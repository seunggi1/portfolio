import { NextResponse, type NextRequest } from 'next/server';
import { getUser } from '@/business';

export async function updateSession(request: NextRequest) {
	const supabaseResponse = NextResponse.next({
		request,
	});

	const user = await getUser();

	if (!user) {
		const url = request.nextUrl.clone();
		url.pathname = '/signin';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
