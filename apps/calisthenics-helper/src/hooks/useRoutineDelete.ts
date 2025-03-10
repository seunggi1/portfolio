import { deleteRoutine, routineKeys } from '@/api/routines';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRoutineDelete(id: string) {
	const client = useQueryClient();

	const handleRoutineDelete = () => {
		deleteMutation.mutate();
	};

	const deleteMutation = useMutation({
		mutationFn: () => deleteRoutine(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: routineKeys.all });
		},
	});

	return {
		result: deleteMutation.data,
		isPending: deleteMutation.isPending,
		handleRoutineDelete,
	};
}
