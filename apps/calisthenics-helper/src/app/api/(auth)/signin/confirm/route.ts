import { NextRequest, NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { ValidatorError } from '@/types/error';
import { verifyToken } from '@/business';

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get('token_hash');

	if (!token) {
		return handleErrorResponse(new ValidatorError('Invalid Token'));
	}

	try {
		const result = await verifyToken(token);

		return NextResponse.redirect(
			new URL(result ? '/' : '/signin', request.url)
		);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
