import { createAuthBusiness } from '@/business';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
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
