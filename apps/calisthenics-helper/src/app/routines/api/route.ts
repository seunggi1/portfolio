import { getServiceClient } from '@/services/serviceClient';

export async function GET(req: Request) {
	const client = await getServiceClient();

	const data = await client.getRoutines(1);

	return Response.json({ data });
}
