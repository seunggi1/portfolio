import { User } from '@/types/auth';
import {
	Comment,
	CommentsRequest,
	CommentsResponse,
	NewComment,
	UpdateComment,
} from '@/types/comment';
import type {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
	RoutinesResponse,
	RoutinesRequest,
} from '@/types/routine';

export interface ServiceClient {
	getRoutines: (
		routineRequest: RoutinesRequest
	) => Promise<RoutinesResponse | null>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
	getRoutineCategories: () => Promise<RoutineCategory[]>;
	createRoutine: (newRoutine: NewRoutine) => Promise<Routine['id']>;
	updateRoutine: (updateRoutine: NewRoutine) => Promise<Routine['id']>;
	deleteRoutine: (routineID: Routine['id']) => Promise<boolean>;
	getComments: (commentsRequest: CommentsRequest) => Promise<CommentsResponse>;
	createComment: (newComment: NewComment) => Promise<Comment['id']>;
	updateComment: (updateComment: UpdateComment) => Promise<boolean>;
	deleteComment: (commentID: Comment['id']) => Promise<boolean>;
	checkDisplayNameExists: (searchDisplayName: string) => Promise<boolean>;
	checkEmailExists: (searchEmail: string) => Promise<boolean>;
	signUp: (
		email: string,
		displayName: string,
		password: string
	) => Promise<boolean>;
	signIn: (email: string, password: string) => Promise<boolean>;
	verifyUserToken: (token: string) => Promise<boolean>;
	resetPasswordForEmail: (email: string) => Promise<boolean>;
	updatePassword: (password: string) => Promise<boolean>;
	getUser(): Promise<User | null>;
	signOut: () => Promise<boolean>;
}
