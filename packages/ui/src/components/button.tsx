import type { JSX, ButtonHTMLAttributes } from 'react';
import type { BorderRadius, Color, Size } from '../types';

export function Button({
	className,
	children,
	onClick,
	color = 'primary',
	borderRadius = 'md',
	size = 'md',
	type = 'button',
	...props
}: {
	color?: Color;
	borderRadius?: BorderRadius;
	size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<button
			className={[
				'btn',
				getSizeClass(size),
				getColorClass(color),
				getBorderRadiusClass(borderRadius),
				className,
			].join(' ')}
			onClick={onClick}
			type={type === 'button' ? 'button' : 'submit'}
			{...props}
		>
			{children}
		</button>
	);
}

function getColorClass(color: Color): string {
	switch (color) {
		case 'primary':
			return 'btn-primary';
		case 'secondary':
			return 'btn-secondary';
		case 'info':
			return 'btn-info';
		case 'success':
			return 'btn-success';
		case 'warning':
			return 'btn-warning';
		case 'error':
		default:
			return 'btn-error';
	}
}

function getBorderRadiusClass(borderRadius: BorderRadius): string {
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

function getSizeClass(borderRadius: Size): string {
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
