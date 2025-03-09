import Link from 'next/link';
import { BicepsFlexed } from 'lucide-react';

export default function Logo() {
	return (
		<Link
			href={'/'}
			className="absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
		>
			<BicepsFlexed className="text-2xl rounded-lg bg-secondary" />
			<span className="text-2xl font-bold">맨몸운동헬퍼</span>
		</Link>
	);
}
