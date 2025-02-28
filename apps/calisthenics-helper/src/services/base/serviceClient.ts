import { User } from '@/types/auth';
import type { RoutineCategory, Routine, RoutineDetail } from '@/types/routine';

export interface ServiceClient {
	getRoutines: (page: number) => Promise<Routine[]>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
	getRoutineCategories: () => Promise<RoutineCategory[]>;
	checkDisplayNameExists: (searchDisplayName: string) => Promise<boolean>;
	checkEmailExists: (searchEmail: string) => Promise<boolean>;
	signUp: (email: string, displayName: string) => Promise<boolean>;
	signIn: (email: string) => Promise<boolean>;
	verifyUserToken: (token: string) => Promise<boolean>;
	getUser(): Promise<User | null>;
	signOut: () => Promise<boolean>;
}
