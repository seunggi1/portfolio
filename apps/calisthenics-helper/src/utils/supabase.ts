import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/infra/supabase/server';

export async function updateSession(request: NextRequest) {
	const supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		const url = request.nextUrl.clone();
		url.pathname = '/signin';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
