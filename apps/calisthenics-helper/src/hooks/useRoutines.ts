import { useMutation, useQuery } from '@tanstack/react-query';
import { NewRoutine, Routine, UpdateRoutine } from '@/types/routine';
import {
	createRoutine,
	fetchRoutines,
	routineKeys,
	updateRoutine,
} from '@/api/routines';

export default function useRoutines() {
	const { data, isLoading, error, refetch } = useQuery<Routine[]>({
		queryKey: routineKeys.all,
		queryFn: fetchRoutines,
	});

	const {
		data: createResult,
		mutate: createMutate,
		isPending: createPending,
	} = useMutation({
		mutationFn: createRoutine,
		onSuccess: () => {
			refetch();
		},
	});

	const {
		data: updateResult,
		mutate: updateMutate,
		isPending: updatePeding,
	} = useMutation({
		mutationFn: updateRoutine,
		onSuccess: () => {
			refetch();
		},
	});

	const handleCreateRoutine = async (newRoutine: NewRoutine) => {
		createMutate(newRoutine);
	};

	const handleUpdateRoutine = async (updateRouine: UpdateRoutine) => {
		updateMutate(updateRouine);
	};

	return {
		routines: data || [],
		isLoading,
		error,
		create: {
			result: createResult,
			handleCreateRoutine,
			isPending: createPending,
		},
		update: {
			result: updateResult,
			handleUpdateRoutine,
			isPending: updatePeding,
		},
	};
}
