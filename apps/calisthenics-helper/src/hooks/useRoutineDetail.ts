import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { RoutineDetail } from '@/types/routine';
import {
	fetchRoutineDetailById,
	routineKeys,
	deleteRoutine,
} from '@/api/routines';

export default function useRoutineDetail(id: string) {
	const client = useQueryClient();
	const { data, isLoading, error, refetch } = useQuery<RoutineDetail>({
		queryKey: routineKeys.detail(id),
		queryFn: () => fetchRoutineDetailById(id),
		enabled: false,
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteRoutine(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: routineKeys.all });
		},
	});

	useEffect(() => {
		refetch();
	}, []);

	const handleRoutineDelete = () => {
		deleteMutation.mutate();
	};

	return {
		routineDetail: data,
		isLoading,
		error,
		deleteInfo: {
			result: deleteMutation.data,
			isPending: deleteMutation.isPending,
			handleRoutineDelete,
		},
	};
}
