import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/services/supabase/server';

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (
		!user &&
		request.nextUrl.pathname.startsWith('/profile') &&
		request.nextUrl.pathname.startsWith('/routine/edit')
	) {
		const url = request.nextUrl.clone();
		url.pathname = '/signin';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
