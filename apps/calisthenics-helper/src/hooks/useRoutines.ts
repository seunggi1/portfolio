import { useMutation, useQuery } from '@tanstack/react-query';
import { NewRoutine, Routine } from '@/types/routine';
import { fetchRoutines, routineKeys } from '@/api/routines';
import { createRoutine } from '@/api/routines/routines';

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

	const handleCreateRoutine = async (newRoutine: NewRoutine) => {
		createMutate(newRoutine);
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
	};
}
