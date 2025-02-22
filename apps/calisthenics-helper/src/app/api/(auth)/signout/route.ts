import { NextResponse } from 'next/server';
import { getServiceClient } from '@/services';
import { handleErrorResponse } from '@/utils/error';

export async function GET() {
	try {
		const client = await getServiceClient();
		await client.signOut();
		return NextResponse.json({});
	} catch (error) {
		return handleErrorResponse(error as Error);
	}
}
