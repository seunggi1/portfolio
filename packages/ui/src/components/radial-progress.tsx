import type { JSX } from 'react';
import type { Size } from '../types';

export default function RadialProgress({
	children,
	value,
	size = 'md',
	thickness = 'sm',
}: {
	children: React.ReactNode;
	value: string | number;
	size?: Size;
	thickness: Size;
}): JSX.Element {
	return (
		<div
			className="radial-progress"
			role="progressbar"
			style={
				{
					'--value': value,
					'--size': getSize(size),
					'--thickness': getThicknessSize(thickness),
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
}
function getSize(size: Size): string {
	switch (size) {
		case 'xs':
			return '10rem';
		case 'sm':
			return '11rem';
		case 'md':
			return '12rem';
		default:
			return '13rem';
	}
}

function getThicknessSize(size: Size): string {
	switch (size) {
		case 'xs':
			return '2px';
		case 'sm':
			return '3px';
		case 'md':
			return '4px';
		default:
			return '5px';
	}
}
