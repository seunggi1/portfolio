import type { Routine, RoutineDetail } from '@/types/routine';
export interface ServiceClient {
	getRoutines: (page: number) => Promise<Routine[]>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
	signIn: (email: string) => Promise<boolean>;
	verifyUserToken: (token: string) => Promise<boolean>;
	signOut: () => Promise<void>;
}
