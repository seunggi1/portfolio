import { NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { createAuthBusiness } from '@/business';

export async function GET() {
	try {
		const authBusiness = await createAuthBusiness();
		const result = await authBusiness.signOut();

		if (!result) {
			throw new Error('server error');
		}

		return NextResponse.json<boolean>(true);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
