import type { JSX } from 'react';
import type { Color, Size } from '@/types';

export default function Progress({
	value,
	color,
	progressText,
	width = 'xl',
	height = 'sm',
}: {
	value: number;
	progressText: string;
	width?: Size;
	height?: Size;
	color: Color;
}): JSX.Element {
	return (
		<div
			className={['relative flex items-center', getWidthClass(width)].join(' ')}
		>
			<progress
				className={[
					'progress progress-primary',
					getColorClass(color),
					getHeightClass(height),
				].join(' ')}
				max={100}
				value={value}
			/>
			<span className="absolute text-xl font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				{progressText}
			</span>
		</div>
	);
}

function getWidthClass(size: Size): string {
	switch (size) {
		case 'xs':
			return 'w-[30%]';
		case 'sm':
			return 'w-[40%]';
		case 'lg':
			return 'w-[60%]';
		case 'xl':
			return 'w-[70%]';
		case '2xl':
			return 'w-[80%]';
		case 'md':
		default:
			return 'w-[50%]';
	}
}

function getHeightClass(size: Size): string {
	switch (size) {
		case 'xs':
			return 'h-[1.5rem]';
		case 'sm':
			return 'h-[1.75rem]';
		case 'lg':
			return 'h-[2.25rem]';
		case 'xl':
			return 'h-[2.5rem]';
		case '2xl':
			return 'h-[2.75rem]';
		case 'md':
		default:
			return 'h-[2.0rem]';
	}
}

function getColorClass(color: Color): string {
	switch (color) {
		case 'primary':
			return 'progress-primary';
		case 'secondary':
			return 'progress-secondary';
		case 'info':
			return 'progress-info';
		case 'success':
			return 'progress-success';
		case 'warning':
			return 'progress-warning';
		case 'error':
		default:
			return 'progress-error';
	}
}
