import { MouseEvent, useState } from 'react';
import { RoutineCategory } from '@/types/routine';
import Link from 'next/link';

type Props = {
	categories: RoutineCategory[];
	selectedCategory: RoutineCategory['id'];
};

const allCategory: RoutineCategory = { id: 'all', name: '전체' };

export default function CategoryFilterTab({
	categories,
	selectedCategory,
}: Props) {
	const typeItems = [allCategory, ...categories].map(({ id, name }) => (
		<li
			key={id}
			className={
				selectedCategory === id
					? getSelectedListItemStyleClass()
					: getListItemStyleClass()
			}
			data-category={id}
		>
			<Link href={`/?category=${id}`}>{name}</Link>
		</li>
	));

	return (
		<section className="border-b">
			<ul className="max-w-screen-xl m-auto flex items-center justify-center gap-4 py-4 text-xl">
				{typeItems}
			</ul>
		</section>
	);
}

function getListItemStyleClass() {
	return 'p-2 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer';
}

function getSelectedListItemStyleClass() {
	return 'p-2 border-b-2 border-b-primary hover:cursor-pointer';
}
