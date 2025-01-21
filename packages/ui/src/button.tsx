import type { JSX, HTMLAttributes } from 'react';

export function Button({
	className,
	children,
	onClick,
	...props
}: HTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<button
			// TODO: 시멘틱 컬러 시스템 적용
			className={[
				'ui-p-2 ui-bg-cyan-300 ui-text-white hover:ui-bg-cyan-400 ui-rounded-lg ',
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
