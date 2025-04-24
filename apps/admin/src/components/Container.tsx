import { ReactNode } from 'react';

type Props = {
	className?: string;
	children: ReactNode;
};

export default function Container({ className, children }: Props) {
	return (
		<div className={['w-3/4 bg-white rounded-md', className].join(' ')}>
			{children}
		</div>
	);
}
