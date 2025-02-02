import type { JSX, ReactNode } from 'react';

export default function Card({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<article className="group max-h-[19rem] hover:cursor-pointer">
			{children}
		</article>
	);
}

function CardHeader({ children }: { children: ReactNode }): JSX.Element {
	return (
		<div className="mb-2 rounded-md overflow-hidden transition-all shadow-md group-hover:shadow-lg sm:group-hover:-translate-y-1">
			{children}
		</div>
	);
}

function CardBody({ children }: { children: ReactNode }): JSX.Element {
	return <div>{children}</div>;
}

Card.CardHeader = CardHeader;
Card.CardBody = CardBody;
