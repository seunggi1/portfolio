import { useQuery } from '@tanstack/react-query';
import { fetchRoutines } from '@/api/Routines';
import { Routine } from '@/types/routine';

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
