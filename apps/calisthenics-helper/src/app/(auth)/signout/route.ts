import { getServiceClient } from '@/services';
import { handleErrorResponse } from '@/utils/error';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const client = await getServiceClient();
		const result = await client.signOut();

		if (!result) {
			throw new Error('server error');
		}

		return NextResponse.redirect(new URL('/', request.url));
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
