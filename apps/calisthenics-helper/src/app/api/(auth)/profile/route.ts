import { createAuthBusiness } from './../../../../business/authBusiness';
import { NextResponse } from 'next/server';
import { handleErrorResponse } from '@/utils/serverErrorHandler';
import { User } from '@/types/auth';

export async function GET() {
	try {
		const authBusiness = await createAuthBusiness();
		const result = await authBusiness.getUser();

		return NextResponse.json<User | null>(result);
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
