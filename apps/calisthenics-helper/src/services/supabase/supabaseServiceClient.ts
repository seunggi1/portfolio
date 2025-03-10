import {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
} from '@/types/routine';
import { ServiceClient } from '../base/serviceClient';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/types/auth';
import { AuthError, ValidatorError } from '@/types/error';

export class SupabaseServiceClient implements ServiceClient {
	constructor(private client: SupabaseClient) {}

	async getRoutines(page: number = 1): Promise<Routine[]> {
		const { data } = await this.client
			.rpc('routines', { page: page })
			.returns<Routine[]>();

		return data ?? [];
	}
	async getRoutineById(id: string): Promise<RoutineDetail | null> {
		const { data, error, count } = await this.client
			.rpc('routine', { routineID: id })
			.single<RoutineDetail>();

		if (error || count === 0) {
			return null;
		}

		data.exercises = Array.from(
			new Map(data.exercises.map((e) => [e.id, e])).values()
		).sort((a, b) => a.order - b.order);

		return data;
	}

	async getRoutineCategories(): Promise<RoutineCategory[]> {
		const { data } = await this.client
			.rpc('categories')
			.returns<RoutineCategory[]>();

		return data || [];
	}

	async createRoutine(newRoutine: NewRoutine): Promise<boolean> {
		const user = await this.getUser();

		if (!user) {
			throw new ValidatorError('invalid user');
		}

		const { data, error } = await this.client
			.rpc('insert_routine', {
				user_id: user.id,
				name: newRoutine.name,
				image_url: null,
				difficulty_level: newRoutine.difficultyLevel,
				total_sets: newRoutine.totalSets,
				rest_seconds: newRoutine.restSeconds,
				description: newRoutine.description,
				exercises_data: newRoutine.exercises,
				categories: newRoutine.categoryIDs,
			})
			.returns<Pick<Routine, 'id'>>();

		if (data) {
			return true;
		}

		if (error) {
			throw new Error(error.message);
		}

		return false;
	}

	async updateRoutine(updateRoutine: NewRoutine): Promise<boolean> {
		const user = await this.getUser();
		const originData = await this.getRoutineById(updateRoutine.id);

		if (!user || !originData) {
			throw new ValidatorError('Invalid Request');
		}

		if (user.id !== originData.userID) {
			throw new AuthError('Unauthorized request');
		}

		const { data, error } = await this.client
			.rpc('update_routine', {
				routine_id: updateRoutine.id,
				update_name: updateRoutine.name,
				update_image_url: null,
				update_difficulty_level: updateRoutine.difficultyLevel,
				update_total_sets: updateRoutine.totalSets,
				update_rest_seconds: updateRoutine.restSeconds,
				update_description: updateRoutine.description,
				update_exercises: updateRoutine.exercises,
				update_categories: updateRoutine.categoryIDs,
			})
			.returns<Pick<Routine, 'id'>>();

		if (data) {
			return true;
		}

		if (error) {
			throw new Error(error.message);
		}

		return false;
	}

	async deleteRoutine(routineID: Routine['id']): Promise<boolean> {
		const user = await this.getUser();
		const originData = await this.getRoutineById(routineID);

		if (!user || !originData) {
			throw new ValidatorError('Invalid Request');
		}

		if (user.id !== originData.userID) {
			throw new AuthError('Unauthorized request');
		}

		const { error, status, statusText } = await this.client.rpc(
			'delete_routine',
			{
				delete_routine_id: routineID,
				request_user_id: user.id,
			}
		);

		return !error;
	}

	async checkDisplayNameExists(searchDisplayName: string): Promise<boolean> {
		const { data, error, count } = await this.client
			.rpc('displayName', {
				searchDisplayName,
			})
			.single<string>();

		return data === searchDisplayName;
	}
	async checkEmailExists(searchEmail: string): Promise<boolean> {
		const { data, error, count } = await this.client
			.rpc('email', {
				searchEmail,
			})
			.single<string>();

		return data === searchEmail;
	}

	async signUp(email: string, displayName: string): Promise<boolean> {
		const { data, error } = await this.client.auth.signInWithOtp({
			email,
			options: {
				data: {
					display_name: displayName,
				},
				shouldCreateUser: true,
			},
		});

		return error === null;
	}

	async signIn(email: string): Promise<boolean> {
		const { data, error } = await this.client.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: process.env.SITE_URL,
			},
		});

		return error === null;
	}

	async verifyUserToken(token: string): Promise<boolean> {
		const { data, error } = await this.client.auth.verifyOtp({
			token_hash: token,
			type: 'email',
		});

		return error === null;
	}

	async signOut(): Promise<boolean> {
		const { error } = await this.client.auth.signOut();

		return error === null;
	}

	async getUser(): Promise<User | null> {
		const { data: session, error: sessionError } =
			await this.client.auth.getUser();

		if (!session || !session.user) {
			return null;
		}

		const { data: user, error } = await this.client
			.rpc('profile', { userID: session.user.id })
			.single<User>();

		if (!user) {
			return null;
		}

		return user;
	}
}
