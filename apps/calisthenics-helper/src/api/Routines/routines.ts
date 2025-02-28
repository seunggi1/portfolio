import type { RoutineCategory, Routine, RoutineDetail } from '@/types/routine';
import { HttpClientBuilder } from '../httpClient';

function getRoutineURL(...paths: string[]) {
	const ROUTINE_URL = 'api/routines';

	const urls = [ROUTINE_URL];

	for (const path of paths) {
		urls.push(path);
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

export async function fetchRoutineCategories(): Promise<RoutineCategory[]> {
	const { data } = await HttpClientBuilder.get(
		getRoutineURL('categories')
	).call<RoutineCategory[]>();

	return data;
}
