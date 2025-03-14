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
		nextCursor: RoutinesRequest['nextCursor'],
		categoryID: RoutineCategory['id']
	) => Promise<RoutinesResponse | null>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
	getRoutineCategories: () => Promise<RoutineCategory[]>;
	createRoutine: (newRoutine: NewRoutine) => Promise<boolean>;
	updateRoutine: (updateRoutine: NewRoutine) => Promise<boolean>;
	deleteRoutine: (routineID: Routine['id']) => Promise<boolean>;
	getComments: (commentsRequest: CommentsRequest) => Promise<CommentsResponse>;
	createComment: (newComment: NewComment) => Promise<Comment['id']>;
	updateComment: (updateComment: UpdateComment) => Promise<boolean>;
	deleteComment: (commentID: Comment['id']) => Promise<boolean>;
	checkDisplayNameExists: (searchDisplayName: string) => Promise<boolean>;
	checkEmailExists: (searchEmail: string) => Promise<boolean>;
	signUp: (email: string, displayName: string) => Promise<boolean>;
	signIn: (email: string) => Promise<boolean>;
	verifyUserToken: (token: string) => Promise<boolean>;
	getUser(): Promise<User | null>;
	signOut: () => Promise<boolean>;
}
