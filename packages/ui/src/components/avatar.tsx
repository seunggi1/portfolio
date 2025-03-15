import { JSX, ReactNode } from 'react';
import { Size } from '../types';

export default function Avatar({
	children,
	size,
}: {
	size: Omit<Size, '2xl' | 'xl'>;
	children: ReactNode;
}): JSX.Element {
	return (
		<div className="avatar placeholder">
			<div
				className={[
					'bg-neutral text-neutral-content rounded-full',
					getSizeClass(size),
				].join(' ')}
			>
				{children}
			</div>
		</div>
	);
}

function getSizeClass(size: Omit<Size, '2xl' | 'xl'>): string {
	switch (size) {
		case 'xs':
			return 'w-8';
		case 'sm':
			return 'w-12';
		case 'md':
			return 'w-16';
		case 'lg':
			return 'w-24';
		default:
			return '';
	}
}
