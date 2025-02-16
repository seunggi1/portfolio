import { Button } from '@repo/ui/common';
import Link from 'next/link';

export default function NotFound() {
	return (
		<section className="flex flex-col justify-center items-center h-full gap-4">
			<p className="text-2xl font-bold">존재하지않는 페이지에요</p>
			<Link href={'/'}>
				<Button>돌아가기</Button>
			</Link>
		</section>
	);
}
