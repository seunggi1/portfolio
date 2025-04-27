import { NextRequest } from 'next/server';
import { createAuthBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';
import { UnauthorizedError } from '@/types/error';
import { handleErrorResponse, IsAdminClient } from '@/utils/serverErrorHandler';

export async function POST(request: NextRequest) {
	if (!IsAdminClient(request)) {
		throw handleErrorResponse(
			new UnauthorizedError(serverHttpErrorMessages.UNAUTHORIZED_ERROR)
		);
	}

	const data = await request.json();
	let result = false;

	try {
		const authBusiness = await createAuthBusiness();
		result = await authBusiness.checkAdminCredential(data);
	} catch (error) {
		return handleErrorResponse(error);
	}

	return new Response(JSON.stringify({ success: result }));
}
