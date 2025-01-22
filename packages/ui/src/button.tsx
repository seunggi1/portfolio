import type { JSX, HTMLAttributes } from 'react';

export function Button({
	className,
	children,
	onClick,
	...props
}: HTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<button
			className={[
				'p-2 bg-primary text-white hover:bg-primary-light rounded-lg',
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
