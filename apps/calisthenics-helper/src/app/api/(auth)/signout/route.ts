import { NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import { handleErrorResponse } from '@/utils/serverErrorHandler';

export async function GET() {
	try {
		const client = await getServiceClient();
		const result = await client.signOut();

		if (!result) {
			throw new Error('server error');
		}

		return NextResponse.json<boolean>(true);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
