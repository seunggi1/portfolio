import type { ReactNode } from 'react';
import Providers from '@/providers';
import { Toaster } from '@/lib/toast/Toaster';
import { Header } from './header';
import MobileMenu from './header/MobileMenu';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<body className="flex flex-col h-screen min-h-screen">
			<Providers>
				<Header />
				<main className="grow pb-[66px] lg:pb-0">{children}</main>
				<MobileMenu />
				<Toaster />
			</Providers>
		</body>
	);
}
