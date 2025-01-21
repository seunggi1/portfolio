import Link from 'next/link';
import { BicepsFlexed } from 'lucide-react';

export default function Logo() {
	return (
		<Link href={'/'} className="flex items-center gap-4">
			<BicepsFlexed className="bg-yellow-300 rounded-lg" />
			<span className="text-lg font-bold">맨몸운동헬퍼</span>
		</Link>
	);
}
