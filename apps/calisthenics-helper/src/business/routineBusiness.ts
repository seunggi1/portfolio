import { getServiceClient } from '@/services';
import {
	NewRoutine,
	Routine,
	RoutinesByUserRequest,
	RoutinesRequest,
} from '@/types/routine';

export async function getRoutines(request: RoutinesRequest) {
	const client = await getServiceClient();

	return client.getRoutines(request);
}

export async function getRoutineById(id: Routine['id']) {
	const client = await getServiceClient();

	return client.getRoutineById(id);
}

export async function getRoutinesByUser(request: RoutinesByUserRequest) {
	const client = await getServiceClient();

	return client.getRoutinesByUser(request);
}

export async function createRoutine(newRoutine: NewRoutine) {
	const client = await getServiceClient();

	return client.createRoutine(newRoutine);
}

export async function updateRoutine(updateRoution: NewRoutine) {
	const client = await getServiceClient();

	return client.updateRoutine(updateRoution);
}

export async function deleteRoutine(id: Routine['id']) {
	const client = await getServiceClient();

	return client.deleteRoutine(id);
}

export async function getRoutineCategories() {
	const client = await getServiceClient();

	return client.getRoutineCategories();
}

export async function getRecommandRoutines() {
	try {
		const client = await getServiceClient();

		return client.getRecommandRoutines(new Date().getDay());
	} catch {
		return [];
	}
}
