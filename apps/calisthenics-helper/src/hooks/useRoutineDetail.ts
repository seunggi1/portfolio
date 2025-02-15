import { useQuery } from '@tanstack/react-query';
import type { RoutineDetail } from '@/types/routine';
import { fetchRoutineDetailById, routineKeys } from '@/api/Routines';

export default function useRoutineDetail(id: string) {
	const { data, isLoading, error } = useQuery<RoutineDetail>({
		queryKey: routineKeys.detail(id),
		queryFn: async () => fetchRoutineDetailById(id),
	});

	return {
		routineDetail: data,
		isLoading,
		error,
	};
}
