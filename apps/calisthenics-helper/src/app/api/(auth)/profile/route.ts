import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { User } from '@/types/auth';

export async function GET(request: NextRequest) {
	try {
		const client = await getServiceClient();
		const result = await client.getUser();

		return NextResponse.json<User | null>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
