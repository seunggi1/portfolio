'use client';

import { MouseEvent } from 'react';
import { RoutineCategory } from '@/types/routine';

type Props = {
	routineCategories: RoutineCategory[];
	value: RoutineCategory['id'][];
	onChange: (value: RoutineCategory['id'][]) => void;
};

export default function RoutineCategorySelect({
	routineCategories,
	value,
	onChange,
}: Props) {
	const selectedCategories = new Set<string>(value);

	const handleRoutineCategoryClick = (e: MouseEvent<HTMLUListElement>) => {
		if (e.target instanceof HTMLLIElement === false || !e.target.dataset.id) {
			return;
		}
		const id = e.target.dataset.id;

		if (selectedCategories.has(id)) {
			selectedCategories.delete(id);
		} else {
			selectedCategories.add(id);
		}

		onChange(Array.from(selectedCategories));
	};

	return (
		<ul
			className="flex flex-col gap-2 md:flex-row"
			onClick={handleRoutineCategoryClick}
		>
			{routineCategories.map(({ id, name }) => (
				<li
					className={[
						'cursor-pointer p-2 rounded-sm text-white select-none text-center',
						selectedCategories.has(id) ? 'bg-primary ' : 'bg-secondary',
					].join(' ')}
					key={id}
					data-id={id}
				>
					{name}
				</li>
			))}
		</ul>
	);
}
