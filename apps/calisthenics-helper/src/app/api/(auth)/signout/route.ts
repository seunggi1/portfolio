import { getServiceClient } from '@/services';
import { NextResponse } from 'next/server';

export async function GET() {
	const client = await getServiceClient();
	try {
		await client.signOut();
		return NextResponse.json(true);
	} catch (error) {
		return NextResponse.json(false, { status: 400 });
	}
}
