import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import { handleErrorResponse } from '@/utils/error';
import { ValidatorError } from '@/types/error';

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get('token_hash');

	if (!token) {
		return handleErrorResponse(new ValidatorError('Invalid Token'));
	}

	try {
		const client = await getServiceClient();
		const result = await client.verifyUserToken(token);

		return NextResponse.redirect(
			new URL(result ? '/' : '/signin', request.url)
		);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
