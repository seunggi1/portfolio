import { serverHttpErrorMessages } from '@/constants/messages';
import { getServiceClient } from '@/lib/service';
import { ServiceClient } from '@/lib/service/base/serviceClient';
import { UnauthorizedError } from '@/types/error';
import {
	NewRoutine,
	Routine,
	RoutinesByUserRequest,
	RoutinesRequest,
} from '@/types/routine';

export class RoutineBusiness {
	constructor(private client: ServiceClient) {}

	async getRoutines(request: RoutinesRequest) {
		return this.client.getRoutines(request);
	}

	async getRoutineById(id: Routine['id']) {
		return this.client.getRoutineById(id);
	}

	async getRoutinesByUser(request: RoutinesByUserRequest) {
		const user = await this.client.getUser();

		if (!user) {
			throw new UnauthorizedError(serverHttpErrorMessages.UNAUTHORIZED_ERROR);
		}

		return this.client.getRoutinesByUser({ ...request, user });
	}

	async createRoutine(newRoutine: NewRoutine) {
		return this.client.createRoutine(newRoutine);
	}

	async updateRoutine(updateRoution: NewRoutine) {
		return this.client.updateRoutine(updateRoution);
	}

	async deleteRoutine(id: Routine['id']) {
		return this.client.deleteRoutine(id);
	}

	async getRoutineCategories() {
		return this.client.getRoutineCategories();
	}

	async getRecommandRoutines() {
		try {
			return this.client.getRecommandRoutines(new Date().getDay());
		} catch {
			return [];
		}
	}
}

export async function createRoutineBusiness() {
	return new RoutineBusiness(await getServiceClient());
}
