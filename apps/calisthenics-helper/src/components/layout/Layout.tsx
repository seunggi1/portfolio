import type { ReactNode } from 'react';
import Providers from '@/providers';
import { Toaster } from '@/lib/toast/Toaster';
import { Header } from './header';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<body className="flex flex-col h-screen min-h-screen">
			<Providers>
				<Header />
				<main className="grow">{children}</main>
				<Toaster />
			</Providers>
		</body>
	);
}
