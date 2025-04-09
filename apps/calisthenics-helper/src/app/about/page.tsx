'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/common';

export default function Home() {
	const router = useRouter();

	const handleClick = () => {
		router.push('/');
	};

	return (
		<section className="flex flex-col items-center justify-center px-8 mt-4 gap-4 ">
			<h2 className="text-[1.25rem] lg:text-[1.5rem] font-bold flex flex-col gap-4">
				<span>맨몸운동 헬퍼는 맨몸 운동을 시작하고 싶지만</span>
				<span>
					어떻게 시작해야될 지 모르겠는 분들을 도와드리기위한 앱입니다.
				</span>
				<span>
					추천 운동 프로그램을 제공함으로써 사용자의 선택 과정을 최소화하고
					최소한의 의지로 운동을 시작할 수 있도록 도와드리고 있습니다.
				</span>
				<span>그럼 맨몸운동 헬퍼와 함께 맨몸운동의 세계로 빠져 볼까요?</span>
			</h2>
			<Button color="primary" borderRadius="md" onClick={handleClick}>
				시작해보기
			</Button>
		</section>
	);
}
