import {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
} from '@/types/routine';
import { ServiceClient } from '../base/serviceClient';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/types/auth';
import { ValidatorError } from '@/types/error';

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
				userID: user.id,
				name: newRoutine.name,
				imageURL: null,
				difficultyLevel: newRoutine.difficultyLevel,
				totalSets: newRoutine.totalSets,
				restSeconds: newRoutine.restSeconds,
				description: newRoutine.description,
				exercisesJson: newRoutine.exercises,
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
