import { createAuthBusiness } from '@/business';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
	const supabaseResponse = NextResponse.next({
		request,
	});

	const user = await (await createAuthBusiness()).getUser();

	if (!user) {
		const url = request.nextUrl.clone();
		url.pathname = '/signin';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
