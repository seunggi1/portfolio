import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authKeys, fetchUser } from '@/api/auth';
import { User } from '@/types/auth';

export default function useAuth() {
	const queryClient = useQueryClient();

	const {
		data: user,
		isLoading,
		refetch,
	} = useQuery<User | null>({
		queryKey: authKeys.base,
		queryFn: fetchUser,
		refetchOnWindowFocus: 'always',
	});

	const handleSignout = () => {
		queryClient.setQueryData(authKeys.base, () => null);
	};

	const handleRefetch = useCallback(refetch, [refetch]);

	return {
		user,
		isLoading,
		handleSignout,
		refetch: handleRefetch,
	};
}
