'use client';

import { PropsWithChildren } from 'react';
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from '@/lib/toast/toast';
import { onActionError } from '@/utils/clientHttpErrorHandler';

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
			onActionError(error, toast.error);
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
