import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editRoutine, routineKeys } from '@/api/routines';
import { NewRoutine } from '@/types/routine';

export function useRoutineEdit() {
	const queryClient = useQueryClient();
	const { data, mutate, isPending } = useMutation({
		mutationFn: editRoutine,
		onSuccess: (result) => {
			queryClient.invalidateQueries({
				queryKey: routineKeys.all,
			});
			queryClient.invalidateQueries({
				queryKey: routineKeys.detail(result),
			});
		},
	});

	const handleRoutineEdit = async (newRoutine: NewRoutine) => {
		mutate({ ...newRoutine });
	};

	return {
		data,
		isPending,
		handleRoutineEdit,
	};
}
