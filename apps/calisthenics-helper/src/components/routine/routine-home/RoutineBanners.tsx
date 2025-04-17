'use client';

import Link from 'next/link';
import { Carousel } from '@repo/ui/common';
import { RecommandRoutine } from '@/types/routine';

type Props = {
	recommandRoutines: RecommandRoutine[];
};

export default function RoutineBanners({ recommandRoutines }: Props) {
	return (
		<div className="max-w-screen-xl m-auto h-[20rem]">
			<Carousel className="w-full h-full">
				<Carousel.Item id="fullbody-routine" className="flex w-full text-white">
					<Link
						href={`/routines/${recommandRoutines.find((t) => t.exerciseType === 1)?.routineID}`}
						className="flex flex-col items-center justify-center w-full text-3xl bg-primary font-bold"
					>
						<span>오늘의 전신 루틴</span>
					</Link>
				</Carousel.Item>
				<Carousel.Item
					id="upperbody-routine"
					className="flex w-full text-white"
				>
					<Link
						href={`/routines/${recommandRoutines.find((t) => t.exerciseType === 2)?.routineID}`}
						className="flex flex-col items-center justify-center w-full text-3xl bg-success font-bold"
					>
						<span>오늘의 상체 루틴</span>
					</Link>
				</Carousel.Item>
				<Carousel.Item
					id="lowerbody-routine"
					className="flex w-full text-white"
				>
					<Link
						href={`/routines/${recommandRoutines.find((t) => t.exerciseType === 3)?.routineID}`}
						className="flex flex-col items-center justify-center w-full text-3xl bg-info font-bold"
					>
						<span>오늘의 하체 루틴</span>
					</Link>
				</Carousel.Item>
			</Carousel>
		</div>
	);
}
