import { fetchRoutineDetailById } from '@/api/Routines';
import { Routine, RoutineDetail } from '@/types/routine';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'RoutineDetail';

export default function useRoutineDetail(id: string) {
	const { data, isLoading, error } = useQuery<RoutineDetail>({
		queryKey: [QUERY_KEY, id],
		queryFn: async () => fetchRoutineDetailById(id),
	});

	return {
		routineDetail: data,
		isLoading,
		error,
	};
}
