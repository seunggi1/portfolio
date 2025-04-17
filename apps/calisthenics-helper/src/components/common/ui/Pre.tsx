import { ReactNode } from 'react';
import { roboto } from '@/styles/fonts';

type Props = {
	children: ReactNode;
};

export default function Pre({ children }: Props) {
	return (
		<pre className={`${roboto.className} text-md text-pretty`}>{children}</pre>
	);
}
