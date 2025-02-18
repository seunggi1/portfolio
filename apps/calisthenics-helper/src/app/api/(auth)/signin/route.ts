import { getServiceClient } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const data = await request.json();

	const client = await getServiceClient();

	const result = await client.signIn(data.email);

	return NextResponse.json(result);
}
