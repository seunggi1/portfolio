'use client';

import { Button } from '@repo/ui/common';
import Link from 'next/link';

export default function error() {
	return (
		<section className="flex flex-col items-center justify-center h-full gap-4">
			<p className="text-2xl font-bold">오류가 발생했어요</p>
			<p>잠시 후 다시 시도해주세요😭</p>
			<Link href={'/'}>
				<Button>돌아가기</Button>
			</Link>
		</section>
	);
}
