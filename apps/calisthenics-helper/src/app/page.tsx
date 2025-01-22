'use client';

import { Button } from '@repo/ui/common';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const fontClass = 'text-[3rem] sm:text-[4rem] lg:text-[6rem] font-bold';

	const handleClick = () => {
		router.push('/routines');
	};

	return (
		<section className="flex flex-col items-center justify-center mt-4">
			<h2 className={fontClass}>맨몸운동을</h2>
			<h2 className={fontClass}>즐길 준비 되셨나요?</h2>
			<Button onClick={handleClick}>시작해보기</Button>
		</section>
	);
}
