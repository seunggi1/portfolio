import type {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
	RoutinesRequest,
	RoutinesResponse,
	RoutinesByUserRequest,
} from '@/types/routine';
import { HttpClientBuilder } from '../httpClient';

function getRoutineURL(...paths: string[]) {
	const ROUTINE_URL = 'api/routines';

	const urls = [ROUTINE_URL];

	for (const path of paths) {
		urls.push(path);
	}

	return urls.join('/');
}

export async function fetchRoutines({
	nextCursor,
	categoryID,
	searchQuery,
}: RoutinesRequest): Promise<RoutinesResponse> {
	const cursor = nextCursor === null || '' ? '' : `cursor=${nextCursor}`;
	const category = categoryID === null || '' ? '' : `category=${categoryID}`;
	const search = searchQuery === null || '' ? '' : `search=${searchQuery}`;

	const queries = [cursor, category, search].filter((s) => s);

	const { data } = await HttpClientBuilder.get(
		`${getRoutineURL()}?${queries.join('&')}`
	).call<RoutinesResponse>();

	return data;
}

export async function fetchRoutinesByUser({
	nextCursor,
}: RoutinesByUserRequest): Promise<RoutinesResponse> {
	const cursor = nextCursor === null || '' ? '' : `cursor=${nextCursor}`;

	const { data } = await HttpClientBuilder.get(
		`${getRoutineURL('user')}?${cursor}`
	).call<RoutinesResponse>();

	return data;
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

export async function editRoutine(editRoutine: NewRoutine) {
	const editClient: HttpClientBuilder = editRoutine.id
		? HttpClientBuilder.put(getRoutineURL(editRoutine.id))
		: HttpClientBuilder.post(getRoutineURL());

	const { data } = await editClient
		.contentType('multipart/form-data')
		.data({
			data: JSON.stringify(editRoutine),
			image: editRoutine.image,
		})
		.call<Routine['id']>();

	return data;
}

export async function deleteRoutine(
	routineID: Routine['id']
): Promise<boolean> {
	const { data } = await HttpClientBuilder.delete(
		getRoutineURL(routineID)
	).call<boolean>();

	return data;
}
