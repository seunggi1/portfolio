import type { ReactNode } from 'react';
import Header from './header';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<body className="flex flex-col h-screen min-h-screen">
			<Header />
			<main className="grow">{children}</main>
		</body>
	);
}
