import { ReactNode } from 'react';

type Props = {
	title: string;
	children: ReactNode;
};

export default function RoutineEditFinishItem({ title, children }: Props) {
	return (
		<div>
			<p className="text-lg font-bold">{title}</p>
			{children}
		</div>
	);
}
