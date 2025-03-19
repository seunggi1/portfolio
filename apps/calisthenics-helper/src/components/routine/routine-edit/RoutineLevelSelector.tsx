import { useState } from 'react';
import { FlameIcon } from '@/components/common/icon';

type Props = {
	value: number;
	error?: string;
	onChange: (level: number) => void;
};

const MAX = 5;

export default function RoutineLevelSelector({ value, onChange }: Props) {
	const [hoverItem, setHoverItem] = useState<number>(value);

	const handleLevelClick = (level: number) => {
		onChange(level);
	};

	return (
		<ul className="flex -gap-[0.4rem]">
			{Array.from({ length: MAX }, (_, i) => (
				<li
					className={`cursor-pointer ${i < hoverItem ? '' : 'opacity-50'}`}
					key={i}
					onMouseOver={() => setHoverItem(i + 1)}
					onMouseLeave={() => setHoverItem(value)}
					onClick={() => handleLevelClick(i + 1)}
				>
					<FlameIcon />
				</li>
			))}
		</ul>
	);
}
