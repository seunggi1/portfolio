import Link from 'next/link';
import { BicepsFlexed } from 'lucide-react';

export default function Logo() {
	return (
		<Link href={'/'} className="flex items-center gap-2  shrink-0">
			<BicepsFlexed className="text-2xl rounded-lg bg-secondary" />
			<span className="hidden text-2xl font-bold lg:block">맨몸운동헬퍼</span>
		</Link>
	);
}
