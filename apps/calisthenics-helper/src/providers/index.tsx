'use client';

import type { PropsWithChildren } from 'react';
import QueryProvider from './QueryProvider';

type Props = PropsWithChildren;

export default function Providers({ children }: Props) {
	return <QueryProvider>{children}</QueryProvider>;
}
