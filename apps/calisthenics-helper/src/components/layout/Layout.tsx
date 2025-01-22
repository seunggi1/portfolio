import type { ReactNode } from 'react';
import Header from './header';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	);
}
