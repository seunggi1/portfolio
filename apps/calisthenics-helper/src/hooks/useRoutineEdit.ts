import { editRoutine, routineKeys } from '@/api/routines';
import { NewRoutine } from '@/types/routine';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRoutineEdit() {
	const queryClient = useQueryClient();
	const { data, mutate, isPending } = useMutation({
		mutationFn: editRoutine,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: routineKeys.all,
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
