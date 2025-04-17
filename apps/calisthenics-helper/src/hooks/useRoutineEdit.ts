import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editRoutine, routineKeys } from '@/api/routines';
import { NewRoutine } from '@/types/routine';

export default function useRoutineEdit() {
	const queryClient = useQueryClient();
	const { data, mutate, isPending } = useMutation({
		mutationFn: editRoutine,
		onSuccess: (result) => {
			queryClient.invalidateQueries({
				predicate: (query) => {
					return query.queryKey.some((key) => key === routineKeys.listBase);
				},
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
