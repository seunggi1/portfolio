type Props = {
	categories: string[];
};

export default function CategoryFilterTab({ categories }: Props) {
	const typeItems = categories.map((v, i) => (
		<li
			key={i}
			className="p-2 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer"
		>
			{v}
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
