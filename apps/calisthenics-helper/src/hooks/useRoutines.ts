import { fetchRoutines } from '@/api/Routines';
import { Routine } from '@/types/routine';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'Routines';

export default function useRoutines() {
	const { data, isLoading, error } = useQuery<Routine[]>({
		queryKey: [QUERY_KEY],
		queryFn: fetchRoutines,
	});

	return {
		routines: data || [],
		isLoading,
		error,
	};
}
