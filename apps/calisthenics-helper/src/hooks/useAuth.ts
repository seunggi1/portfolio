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

	const signoutMutation = useMutation({
		mutationFn: signout,
		onMutate: () => {
			queryClient.setQueryData(authKeys.base, () => null);
			return user;
		},
		onError: (error, variable, contetxt) => {
			queryClient.setQueryData(authKeys.base, () => contetxt);
		},
	});

	const handleSignout = () => {
		signoutMutation.mutate();
	};

	return {
		user,
		isLoading,
		handleSignout,
	};
}
