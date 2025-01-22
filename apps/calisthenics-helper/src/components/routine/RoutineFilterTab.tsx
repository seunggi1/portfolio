import { JSX, ReactNode, useMemo } from 'react';

const items = ['전체', '가슴', '어깨', '하체'];

export default function RoutineFilterTab() {
	const typeItems = items.map((v, i) => (
		<li
			key={i}
			className="p-2 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer"
		>
			{v}
		</li>
	));

	return (
		<section className="border-b-2">
			<ul className="flex items-center justify-center gap-4 py-4 text-xl">
				{typeItems}
			</ul>
		</section>
	);
}
