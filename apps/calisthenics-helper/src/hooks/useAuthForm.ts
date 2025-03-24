import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { authKeys } from '@/api/auth';

export default function useAuthForm(AuthFormResult: boolean) {
	const queryClient = useQueryClient();
	const router = useRouter();

	useEffect(() => {
		if (AuthFormResult) {
			queryClient.invalidateQueries({ queryKey: authKeys.base });
			router.push('/');
		}
	}, [queryClient, AuthFormResult, router]);
}
