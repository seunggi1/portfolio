import Link from 'next/link';
import { Button } from '@repo/ui/common';

export default function ForbiddenPage() {
	return (
		<section className="flex flex-col items-center justify-center h-full gap-4">
			<p className="text-2xl font-bold">올바르지 않은 접근입니다.</p>
			<Link href={'/'}>
				<Button>돌아가기</Button>
			</Link>
		</section>
	);
}
