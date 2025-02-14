import type { Routine, RoutineDetail } from '@/types/routine';
export interface ServiceClient {
	getRoutines: (page: number) => Promise<Routine[]>;
	getRoutineById: (Id: string) => Promise<RoutineDetail | null>;
}
