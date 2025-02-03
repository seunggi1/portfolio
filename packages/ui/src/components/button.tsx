import type { JSX, HTMLAttributes } from 'react';
import type { BorderRadius, Color, Size } from '../types';

export function Button({
	className,
	children,
	onClick,
	color = 'primary',
	borderRadius = 'md',
	size = 'md',
	...props
}: {
	color?: Color;
	borderRadius?: BorderRadius;
	size?: Size;
} & HTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<button
			className={[
				'btn',
				createButtonSize(size),
				createButtonColor(color),
				createBorderRadius(borderRadius),
				className,
			].join(' ')}
			onClick={onClick}
			type="button"
			{...props}
		>
			{children}
		</button>
	);
}

function createButtonColor(color: Color): string {
	switch (color) {
		case 'primary':
			return 'btn-primary';
		case 'secondary':
			return 'btn-secondary';
	}
}

function createBorderRadius(borderRadius: BorderRadius): string {
	switch (borderRadius) {
		case 'sm':
			return 'rounded-sm';
		case 'md':
			return 'rounded-md';
		case 'lg':
			return 'rounded-lg';
		case 'full':
			return 'rounded-full';
		default:
			return '';
	}
}

function createButtonSize(borderRadius: Size): string {
	switch (borderRadius) {
		case 'xs':
			return 'btn-xs';
		case 'sm':
			return 'btn-sm';
		case 'md':
			return 'btn-md';
		case 'lg':
			return 'btn-lg';
		case 'xl':
			return 'btn-xl';
		default:
			return '';
	}
}
