import { ExerciseSet, Routine, RoutineDetail } from '@/types/routine';
import { ServiceClient } from '../base/serviceClient';
import { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseServiceClient implements ServiceClient {
	constructor(private client: SupabaseClient) {}

	async getRoutines(page: number = 1): Promise<Routine[]> {
		const { data } = await this.client
			.rpc('routines', { page: page })
			.returns<Routine[]>();

		return data ?? [];
	}
	async getRoutineById(id: string): Promise<RoutineDetail | null> {
		const routineRPC = this.client
			.rpc('routine', { routineID: id })
			.returns<Routine[]>()
			.single();

		const exerciseSetsRPC = this.client
			.rpc('exerciseSets', { routineID: id })
			.returns<ExerciseSet[]>();

		const results = await Promise.all([routineRPC, exerciseSetsRPC]);

		if (results.every((r) => r.status === 200 && r.data)) {
			return { ...results[0].data!, exerciseSets: results[1].data! };
		}

		return null;
	}
}
