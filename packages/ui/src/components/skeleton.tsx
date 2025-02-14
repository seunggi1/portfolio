import type { JSX } from 'react';

export default function Skeleton({
	className,
}: {
	className: string;
}): JSX.Element {
	return <div className={['skeleton', className].join(' ')} />;
}
