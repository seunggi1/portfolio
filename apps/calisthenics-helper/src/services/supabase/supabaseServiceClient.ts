import { ExerciseSet, Routine, RoutineDetail } from '@/types/routine';
import { ServiceClient } from '../base/serviceClient';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

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

	async signIn(email: string): Promise<boolean> {
		try {
			const { data, error } = await this.client.auth.signInWithOtp({
				email,
				options: {
					data: {
						display_name: email.split('@')[0] + randomUUID().slice(0, 4),
					},
					shouldCreateUser: true,
				},
			});

			console.log(data, error);
			return error === null;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async verifyUserToken(token: string): Promise<boolean> {
		try {
			const { data, error } = await this.client.auth.verifyOtp({
				token_hash: token,
				type: 'email',
			});
			console.log(data, error);
			return error === null;
		} catch (error) {
			console.log(error);

			return false;
		}
	}

	async signOut(): Promise<void> {
		const { error } = await this.client.auth.signOut();

		return;
	}
}
