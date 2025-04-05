import { SupabaseClient } from '@supabase/supabase-js';
import {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
	RoutinesResponse,
	RoutinesRequest,
	RecommandRoutine,
	RoutinesByUserRequest,
} from '@/types/routine';
import { ServiceClient } from '../base/serviceClient';
import { User } from '@/types/auth';
import { AuthError, ValidatorError } from '@/types/error';
import {
	CommentsResponse,
	NewComment,
	Comment,
	CommentsRequest,
	UpdateComment,
} from '@/types/comment';
import { Contact } from '@/types/contact';

export class SupabaseServiceClient implements ServiceClient {
	constructor(private client: SupabaseClient) {}

	getImageBucketName() {
		return process.env.SUPABASE_BUCKET_NAME ?? 'image';
	}

	async uploadImage(file: File) {
		const { data, error } = await this.client.storage
			.from(this.getImageBucketName())
			.upload(file.lastModified + file.name, file);

		if (error) {
			throw new ValidatorError('Invalid image file');
		}

		return this.getImagePublicURL(data.path);
	}

	async deleteImage(image: string | null) {
		if (image === null) {
			return true;
		}
		const { data, error } = await this.client.storage
			.from(this.getImageBucketName())
			.remove([this.getImageOriginName(image)]);

		if (error) {
			throw new Error('Image delete error');
		}

		return !!data[0];
	}

	getImageOriginName(imagePath: string) {
		const DUMMY = 'dummy';
		const publicURL = this.getImagePublicURL(DUMMY).replace(DUMMY, '');
		const path = decodeURI(imagePath.replace(publicURL, ''));
		return path;
	}

	getImagePublicURL(imagePath: string) {
		return this.client.storage
			.from(this.getImageBucketName())
			.getPublicUrl(imagePath).data.publicUrl;
	}

	async getRoutines({
		categoryID,
		nextCursor,
		searchQuery,
	}: RoutinesRequest): Promise<RoutinesResponse | null> {
		const { data, error } = await this.client
			.rpc('routines', {
				cursor_id: nextCursor === '' ? null : nextCursor,
				filter_category_id: categoryID === 'all' || '' ? null : categoryID,
				search_query: searchQuery,
			})
			.single<RoutinesResponse>();

		if (error || !data) {
			throw new Error(error.message);
		}

		return {
			routines: data.routines || [],
			nextCursor: data.nextCursor,
		};
	}

	async getRoutinesByUser({
		nextCursor,
	}: RoutinesByUserRequest): Promise<RoutinesResponse | null> {
		const user = await this.getUser();

		if (!user) {
			throw new AuthError('Invalid user');
		}

		const { data, error } = await this.client
			.rpc('routines_by_user', {
				target_user_id: user.id,
				cursor_id: nextCursor === '' ? null : nextCursor,
			})
			.single<RoutinesResponse>();

		if (error || !data) {
			throw new Error(error.message);
		}

		return {
			routines: data.routines || [],
			nextCursor: data.nextCursor,
		};
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
		const { data, error } = await this.client
			.rpc('categories')
			.returns<RoutineCategory[]>();

		if (error) {
			throw new Error(error.message);
		}

		return data || [];
	}

	async createRoutine(newRoutine: NewRoutine): Promise<Routine['id']> {
		const user = await this.getUser();

		if (!user) {
			throw new ValidatorError('invalid user');
		}

		let uploadImageURL: string | null = null;
		if (newRoutine.image && newRoutine.image instanceof File) {
			uploadImageURL = await this.uploadImage(newRoutine.image);
		}

		const { data, error } = await this.client
			.rpc('insert_routine', {
				user_id: user.id,
				name: newRoutine.name,
				image_url: uploadImageURL,
				difficulty_level: newRoutine.difficultyLevel,
				total_sets: newRoutine.totalSets,
				rest_seconds: newRoutine.restSeconds,
				description: newRoutine.description,
				exercises_data: newRoutine.exercises,
				categories: newRoutine.categoryIDs,
			})
			.returns<Routine['id']>();

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}

	async updateRoutine(updateRoutine: NewRoutine): Promise<Routine['id']> {
		const user = await this.getUser();
		const originData = await this.getRoutineById(updateRoutine.id);

		if (!user || !originData) {
			throw new ValidatorError('Invalid Request');
		}

		if (user.id !== originData.userID) {
			throw new AuthError('Unauthorized request');
		}

		let uploadImageURL: string | null = null;
		if (updateRoutine.image === null || updateRoutine.image instanceof File) {
			await this.deleteImage(originData.imageURL);

			if (updateRoutine.image instanceof File) {
				uploadImageURL = await this.uploadImage(updateRoutine.image);
			}
		} else if (updateRoutine.image === originData.imageURL) {
			uploadImageURL = originData.imageURL;
		}

		const { data, error } = await this.client
			.rpc('update_routine', {
				routine_id: updateRoutine.id,
				update_name: updateRoutine.name,
				update_image_url: uploadImageURL,
				update_difficulty_level: updateRoutine.difficultyLevel,
				update_total_sets: updateRoutine.totalSets,
				update_rest_seconds: updateRoutine.restSeconds,
				update_description: updateRoutine.description,
				update_exercises: updateRoutine.exercises,
				update_categories: updateRoutine.categoryIDs,
			})
			.returns<Routine['id']>();

		if (error) {
			throw new Error(error.message);
		}

		return data;
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

		await this.deleteImage(originData.imageURL);

		const { error } = await this.client.rpc('delete_routine', {
			delete_routine_id: routineID,
			request_user_id: user.id,
		});

		if (error) {
			throw new Error(error.message);
		}

		return !error;
	}

	async getComments(
		commentsRequest: CommentsRequest
	): Promise<CommentsResponse> {
		const { data, error } = await this.client
			.rpc('read_comments', {
				read_routine_id: commentsRequest.routineID,
				cursor_id: commentsRequest.nextCursor,
			})
			.single<CommentsResponse>();

		if (error) {
			throw new Error(error.details);
		}

		return {
			comments: data.comments || [],
			nextCursor: data.nextCursor,
		};
	}

	async createComment(newComment: NewComment): Promise<Comment['id']> {
		const user = await this.getUser();

		if (!user) {
			throw new AuthError('Invalid user');
		}

		const { data, error } = await this.client
			.rpc('create_comment', {
				routine_id: newComment.routineID,
				comment: newComment.comment,
				recommendation: newComment.recommendation,
				user_id: user.id,
			})
			.single<Comment['id']>();

		if (!data || error) {
			throw new Error('Comment did not create');
		}

		return data;
	}

	async updateComment(updateComment: UpdateComment): Promise<boolean> {
		const user = await this.getUser();

		if (!user) {
			throw new AuthError('Invalid user');
		}

		const { error } = await this.client.rpc('update_comment', {
			update_id: updateComment.id,
			update_comment: updateComment.comment,
			update_recommendation: updateComment.recommendation,
			request_user_id: user.id,
		});

		if (error) {
			throw new Error(error.message);
		}

		return !error;
	}
	async deleteComment(commentID: Comment['id']): Promise<boolean> {
		const user = await this.getUser();

		if (!user) {
			throw new AuthError('Invalid user');
		}

		const { error } = await this.client.rpc('delete_comment', {
			delete_id: commentID,
			request_user_id: user.id,
		});

		return !error;
	}

	async checkDisplayNameExists(searchDisplayName: string): Promise<boolean> {
		const { data, error } = await this.client
			.rpc('displayName', {
				searchDisplayName,
			})
			.single<string>();

		if (error) {
			throw new Error(error.message);
		}

		return data === searchDisplayName;
	}
	async checkEmailExists(searchEmail: string): Promise<boolean> {
		const { data, error } = await this.client
			.rpc('email', {
				searchEmail,
			})
			.single<string>();

		if (error) {
			throw new Error(error.message);
		}

		return data === searchEmail;
	}

	async signUpWithMagicLink(
		email: string,
		displayName: string
	): Promise<boolean> {
		const { error } = await this.client.auth.signInWithOtp({
			email,
			options: {
				data: {
					display_name: displayName,
				},
				shouldCreateUser: true,
			},
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async signInWithMagicLink(email: string): Promise<boolean> {
		const { error } = await this.client.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: process.env.SITE_URL,
			},
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async signUp(
		email: string,
		displayName: string,
		password: string
	): Promise<boolean> {
		const { error } = await this.client.auth.signUp({
			email,
			password,
			options: {
				data: {
					display_name: displayName,
				},
			},
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async signIn(email: string, password: string): Promise<boolean> {
		const { error } = await this.client.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async resetPasswordForEmail(email: string): Promise<boolean> {
		const { error } = await this.client.auth.resetPasswordForEmail(email, {
			redirectTo: process.env.SITE_URL,
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async updatePassword(password: string): Promise<boolean> {
		const { error } = await this.client.auth.updateUser({
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async verifyUserToken(token: string): Promise<boolean> {
		const { error } = await this.client.auth.verifyOtp({
			token_hash: token,
			type: 'email',
		});

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async signOut(): Promise<boolean> {
		const { error } = await this.client.auth.signOut();

		if (error) {
			throw new Error(error.message);
		}

		return error === null;
	}

	async getUser(): Promise<User | null> {
		const { data: session } = await this.client.auth.getUser();

		if (!session || !session.user) {
			return null;
		}

		const { data: user } = await this.client
			.rpc('profile', { userID: session.user.id })
			.single<User>();

		if (!user) {
			return null;
		}

		return user;
	}

	async getRecommandRoutines(day: number): Promise<RecommandRoutine[]> {
		const { data, error } = await this.client
			.rpc('get_recommand_routines', { target_day: day })
			.returns<RecommandRoutine[]>();

		if (error) {
			throw new Error(error.message);
		}

		return data ?? [];
	}

	async updateDisplayName(displayName: User['displayName']): Promise<boolean> {
		const user = await this.getUser();

		if (!user) {
			throw new AuthError('Invalid User');
		}

		const { error } = await this.client.auth.updateUser({
			email: user.email,
			data: {
				display_name: displayName,
			},
		});

		if (error) {
			throw new Error(error.message);
		}

		const rpcResult = await this.client.rpc('update_display_name', {
			user_id: user.id,
			new_display_name: displayName,
		});

		return !rpcResult.error;
	}

	async deleteUser(email: string): Promise<boolean> {
		const user = await this.getUser();

		if (!user || user.email !== email) {
			throw new AuthError('Invalid User');
		}

		const { error } = await this.client.rpc('delete_user', {
			delete_id: user.id,
		});

		if (error) {
			throw new Error(error.message);
		}

		return !error;
	}

	async createContact(contact: Contact): Promise<boolean> {
		const user = await this.getUser();

		if (!user) {
			throw new AuthError('Invalid User');
		}

		const { error } = await this.client.rpc('create_contact', {
			...contact,
			user_id: user.id,
		});

		if (error) {
			throw new Error(error.message);
		}

		return !error;
	}
}
