import { RoutineCategory } from '@/types/routine';

type Props = {
	categories: RoutineCategory[];
};

export default function CategoryFilterTab({ categories }: Props) {
	const typeItems = categories.map(({ id, name }) => (
		<li key={id} className={getListItemStyleClass()}>
			{name}
		</li>
	));

	return (
		<section className="border-b">
			<ul className="max-w-screen-xl m-auto flex items-center justify-center gap-4 py-4 text-xl">
				<li id="all" className={getListItemStyleClass()}>
					전체
				</li>
				{typeItems}
			</ul>
		</section>
	);
}

function getListItemStyleClass() {
	return 'p-2 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer';
}
