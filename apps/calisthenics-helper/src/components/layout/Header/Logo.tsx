import Link from 'next/link';
import { BicepsFlexed } from 'lucide-react';

export default function Logo() {
	return (
		<Link href={'/'} className="flex items-center gap-2 ">
			<BicepsFlexed className="text-2xl bg-secondary rounded-lg" />
			<span className="text-2xl font-bold">맨몸운동헬퍼</span>
		</Link>
	);
}
