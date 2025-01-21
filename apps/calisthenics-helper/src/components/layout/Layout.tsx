import type { ReactNode } from 'react';
import Header from './Header';

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
