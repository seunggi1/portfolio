'use server';

import { createRoutineBusiness } from '@/business';
import { CompletedRoutineResponse } from '@/types/routine';

export async function saveCompletedRoutineAction({
	routineID,
	status,
}: CompletedRoutineResponse): Promise<CompletedRoutineResponse> {
	if (status === 'success') {
		return {
			routineID,
			status,
		};
	}

	if (!routineID) {
		return {
			status: 'error',
			routineID,
		};
	}

	try {
		const routineBusiness = await createRoutineBusiness();
		const result = await routineBusiness.saveCompletedRoutine({
			routineID,
		});

		return {
			status: result ? 'success' : 'error',
			routineID,
		};
	} catch {
		return {
			status: 'error',
			routineID,
		};
	}
}
