import type { Routine, RoutineDetail } from '@/types/routine';
import { HttpClientBuilder } from '../httpClient';

function getRoutineURL(id?: string) {
	const ROUTINE_URL = 'api/routines';

	const urls = [ROUTINE_URL];

	if (id) {
		urls.push(id);
	}

	return urls.join('/');
}

export async function fetchRoutines(): Promise<Routine[]> {
	const { data } =
		await HttpClientBuilder.get(getRoutineURL()).call<Routine[]>();

	return data || [];
}

export async function fetchRoutineDetailById(
	id: string
): Promise<RoutineDetail> {
	const { data } = await HttpClientBuilder.get(
		getRoutineURL(id)
	).call<RoutineDetail>();

	return data;
}
