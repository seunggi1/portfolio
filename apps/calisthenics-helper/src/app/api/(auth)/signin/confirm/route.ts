import { getServiceClient } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const client = await getServiceClient();

	const token = request.nextUrl.searchParams.get('token_hash');
	let result: boolean = false;
	if (token) {
		result = await client.verifyUserToken(token);
	}

	return NextResponse.redirect(new URL(result ? '/' : '/signin', request.url));
}
