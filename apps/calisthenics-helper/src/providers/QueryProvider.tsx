'use client';

import { PropsWithChildren } from 'react';
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from '@/lib/toast/toast';

type Props = PropsWithChildren;
const client = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 1,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(`에러가 발생했습니다. (${error.code})`);
		},
	}),
});

export default function QueryProvider({ children }: Props) {
	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
