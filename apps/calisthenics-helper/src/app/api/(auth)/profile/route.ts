import { NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { User } from '@/types/auth';
import { getUser } from '@/business';

export async function GET() {
	try {
		const result = await getUser();

		return NextResponse.json<User | null>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
