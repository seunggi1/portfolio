import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authKeys, fetchUser, signout } from '@/api/auth';
import { User } from '@/types/auth';

export default function useAuth() {
	const queryClient = useQueryClient();

	const {
		data: user,
		isLoading,
		error,
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
