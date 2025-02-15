import type { Routine, RoutineDetail } from '@/types/routine';
import { HttpClientBuilder } from '../httpClient';

function getRoutineURL(id?: string) {
	const ROUTINE_URL = 'routines/api';

	const urls = [ROUTINE_URL];

	if (id) {
		urls.push(id);
	}

	return urls.join('/');
}

export async function fetchRoutines(): Promise<Routine[]> {
	const res = await HttpClientBuilder.get(getRoutineURL()).call<Routine[]>();

	return res.data;
}

export async function fetchRoutineDetailById(
	id: string
): Promise<RoutineDetail> {
	const res = await HttpClientBuilder.get(
		getRoutineURL(id)
	).call<RoutineDetail>();

	return res.data;
}
