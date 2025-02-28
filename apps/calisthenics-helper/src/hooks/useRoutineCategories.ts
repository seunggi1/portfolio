import { useQuery } from '@tanstack/react-query';
import { RoutineCategory } from '@/types/routine';
import { fetchRoutineCategories } from '@/api/routines/routines';
import { routineKeys } from '@/api/routines';

export default function useRoutineCategories() {
	const { data, isLoading, error } = useQuery<RoutineCategory[]>({
		queryKey: routineKeys.categories(),
		queryFn: fetchRoutineCategories,
	});

	return {
		routineCategories: data || [],
		isLoading,
		error,
	};
}
