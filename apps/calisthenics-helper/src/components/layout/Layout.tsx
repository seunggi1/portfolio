import type { ReactNode } from 'react';
import Header from './header';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
