import { createAuthBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';
import { UnauthorizedError } from '@/types/error';
import { handleErrorResponse, IsAdminClient } from '@/utils/serverErrorHandler';
import { addDay, getDateString } from '@repo/utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	if (!IsAdminClient(request)) {
		throw handleErrorResponse(
			new UnauthorizedError(serverHttpErrorMessages.UNAUTHORIZED_ERROR)
		);
	}

	const params = request.nextUrl.searchParams;

	try {
		const authBusiness = await createAuthBusiness();
		const result = await authBusiness.getTotalStats({
			startDate:
				params.get('startDate') ?? getDateString(addDay(new Date(), -30)),
			endDate: params.get('endDate') ?? getDateString(new Date()),
		});

		return new Response(JSON.stringify({ data: result }));
	} catch (error) {
		return handleErrorResponse(error);
	}
}
