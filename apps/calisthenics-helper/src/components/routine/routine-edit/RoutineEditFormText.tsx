import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export default function RoutineEditFormText({ children }: Props) {
	return <p className="truncate">{children}</p>;
}
