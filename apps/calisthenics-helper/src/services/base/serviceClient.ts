import { User } from '@/types/auth';
import type {
	RoutineCategory,
	Routine,
	RoutineDetail,
	NewRoutine,
} from '@/types/routine';

export interface ServiceClient {
	getRoutines: (page: number) => Promise<Routine[]>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
	getRoutineCategories: () => Promise<RoutineCategory[]>;
	createRoutine: (newRoutine: NewRoutine) => Promise<boolean>;
	updateRoutine: (updateRoutine: NewRoutine) => Promise<boolean>;
	deleteRoutine: (routineID: Routine['id']) => Promise<boolean>;
	checkDisplayNameExists: (searchDisplayName: string) => Promise<boolean>;
	checkEmailExists: (searchEmail: string) => Promise<boolean>;
	signUp: (email: string, displayName: string) => Promise<boolean>;
	signIn: (email: string) => Promise<boolean>;
	verifyUserToken: (token: string) => Promise<boolean>;
	getUser(): Promise<User | null>;
	signOut: () => Promise<boolean>;
}
