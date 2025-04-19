import { NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { createAuthBusiness } from '@/business';
import { serverHttpErrorMessages } from '@/constants/messages';

export async function GET() {
	try {
		const authBusiness = await createAuthBusiness();
		const result = await authBusiness.signOut();

		if (!result) {
			throw new Error(serverHttpErrorMessages.SERVER_ERROR);
		}

		return NextResponse.json<boolean>(true);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
