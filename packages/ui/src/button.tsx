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
				'ui-p-2 ui-bg-primary ui-text-white hover:ui-bg-primary-light ui-rounded-lg',
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
