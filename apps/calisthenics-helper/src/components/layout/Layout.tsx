import type { ReactNode } from 'react';
import Header from './header';
import Providers from '@/providers';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<body className="flex flex-col h-screen min-h-screen">
			<Providers>
				<Header />
				<main className="grow">{children}</main>
			</Providers>
		</body>
	);
}
