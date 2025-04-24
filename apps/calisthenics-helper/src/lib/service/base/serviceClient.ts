import {
	AdminSignIn,
	RequiredUserData,
	SignInData,
	SignUpData,
	StatsRequest,
	StatsResult,
	UpdatePasswordResult,
	User,
} from '@/types/auth';
import {
	Comment,
	CommentsRequest,
	CommentsResponse,
	NewComment,
	UpdateComment,
} from '@/types/comment';
import { Contact } from '@/types/contact';
import type {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
	RoutinesResponse,
	RoutinesRequest,
	RecommandRoutine,
	RoutinesByUserRequest,
	CompletedRoutine,
	UserStatsResult,
	UserStatsRequest,
} from '@/types/routine';

export interface ServiceClient {
	getRoutines: (
		routineRequest: RoutinesRequest
	) => Promise<RoutinesResponse | null>;
	getRoutinesByUser: (
		data: RequiredUserData<RoutinesByUserRequest>
	) => Promise<RoutinesResponse | null>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
	getRecommandRoutines: (day: number) => Promise<RecommandRoutine[]>;
	getRoutineCategories: () => Promise<RoutineCategory[]>;
	createRoutine: (
		data: RequiredUserData<{ newRoutine: NewRoutine }>
	) => Promise<Routine['id']>;
	updateRoutine: (
		data: RequiredUserData<{ updateRoutine: NewRoutine }>
	) => Promise<Routine['id']>;
	deleteRoutine: (
		data: RequiredUserData<{ routineID: Routine['id'] }>
	) => Promise<boolean>;
	getComments: (commentsRequest: CommentsRequest) => Promise<CommentsResponse>;
	createComment: (
		data: RequiredUserData<{ newComment: NewComment }>
	) => Promise<Comment['id']>;
	updateComment: (
		data: RequiredUserData<{ updateComment: UpdateComment }>
	) => Promise<boolean>;
	deleteComment: (
		data: RequiredUserData<{ commentID: Comment['id'] }>
	) => Promise<boolean>;
	checkDisplayNameExists: (searchDisplayName: string) => Promise<boolean>;
	checkEmailExists: (searchEmail: string) => Promise<boolean>;
	signUp: (signUpData: SignUpData) => Promise<boolean>;
	signIn: (signInData: SignInData) => Promise<boolean>;
	resetPasswordForEmail: (email: string) => Promise<boolean>;
	verifyToken: (token: string) => Promise<boolean>;
	updatePassword: (password: string) => Promise<UpdatePasswordResult>;
	getUser(): Promise<User | null>;
	signOut: () => Promise<boolean>;
	updateDisplayName: (displayName: User['displayName']) => Promise<boolean>;
	deleteUser: (email: User['email']) => Promise<boolean>;
	createContact: (contact: Contact) => Promise<boolean>;
	saveCompletedRoutine: (
		data: RequiredUserData<CompletedRoutine>
	) => Promise<boolean>;
	getUserStats: (
		data: RequiredUserData<UserStatsRequest>
	) => Promise<UserStatsResult[]>;
	getTotalStats: (data: StatsRequest) => Promise<StatsResult | null>;
	checkAdminCredential: (data: AdminSignIn) => Promise<boolean>;
}
