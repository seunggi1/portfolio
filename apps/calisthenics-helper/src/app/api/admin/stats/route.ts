import { createAuthBusiness } from '@/business';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { addDay, getDateString } from '@/utils/time';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
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
