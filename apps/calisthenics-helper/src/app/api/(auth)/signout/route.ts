import { NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { signOut } from '@/business';

export async function GET() {
	try {
		const result = await signOut();

		if (!result) {
			throw new Error('server error');
		}

		return NextResponse.json<boolean>(true);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
