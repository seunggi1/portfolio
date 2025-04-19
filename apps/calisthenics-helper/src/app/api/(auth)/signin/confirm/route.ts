import { NextRequest, NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { ValidatorError } from '@/types/error';
import { createAuthBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get('token_hash');

	if (!token) {
		return handleErrorResponse(
			new ValidatorError(serverHttpErrorMessages.TOKEN_ERROR)
		);
	}

	try {
		const authBusiness = await createAuthBusiness();
		const result = await authBusiness.verifyToken(token);

		return NextResponse.redirect(
			new URL(result ? '/' : '/signin', request.url)
		);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
