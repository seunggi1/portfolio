import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export default function RoutineEditFormHeading({ children }: Props) {
	return (
		<h2 className="px-4 pt-4 mb-4 text-2xl font-bold text-center">
			{children}
		</h2>
	);
}
