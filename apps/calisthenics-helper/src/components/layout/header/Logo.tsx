import Link from 'next/link';
import { MuscleIcon } from '@/components/common/icon';

export default function Logo() {
	return (
		<Link href={'/'} className="flex items-center gap-2 shrink-0">
			<MuscleIcon />
			<span className="hidden text-2xl font-bold lg:block">맨몸운동헬퍼</span>
		</Link>
	);
}
