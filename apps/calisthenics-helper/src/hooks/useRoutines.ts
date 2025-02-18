import { useQuery } from '@tanstack/react-query';
import { Routine } from '@/types/routine';
import { fetchRoutines, routineKeys } from '@/api/routines';

export default function useRoutines() {
	const { data, isLoading, error } = useQuery<Routine[]>({
		queryKey: routineKeys.all,
		queryFn: fetchRoutines,
	});

	return {
		routines: data || [],
		isLoading,
		error,
	};
}
