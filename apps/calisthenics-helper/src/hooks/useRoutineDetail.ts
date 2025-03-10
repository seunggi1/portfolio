import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { RoutineDetail } from '@/types/routine';
import { fetchRoutineDetailById, routineKeys } from '@/api/routines';

export default function useRoutineDetail(id: string) {
	const { data, isLoading, error, refetch } = useQuery<RoutineDetail>({
		queryKey: routineKeys.detail(id),
		queryFn: () => fetchRoutineDetailById(id),
		enabled: false,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		routineDetail: data,
		isLoading,
		error,
	};
}
