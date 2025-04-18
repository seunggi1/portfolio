import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './business/authBusiness';

const AUTH_URL_PATHS = ['/profile', '/routines/edit', '/contact'];

export async function middleware(request: NextRequest) {
	if (AUTH_URL_PATHS.some((p) => request.nextUrl.pathname.startsWith(p))) {
		return await updateSession(request);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
