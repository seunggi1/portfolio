import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export default function Pre({ children }: Props) {
	return (
		<pre className="font-['Karla','Karla_Fallback'] text-md text-pretty">
			{children}
		</pre>
	);
}
