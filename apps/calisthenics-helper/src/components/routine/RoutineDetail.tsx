'use client';

import { type RoutineDetail } from '@/types/routine';
import { createHttpClient } from '@/utils/httpClient';
import { Button } from '@repo/ui/common';
import { Flame } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
	id: string;
};

export default function RoutineDetail({ id }: Props) {
	const [routine, setRoutine] = useState<RoutineDetail>();

	useEffect(() => {
		createHttpClient<RoutineDetail>(`/routines/api/${id}`)
			.get()
			.then(setRoutine);
	}, []);

	if (!routine) {
		return (
			<section>
				<span>데이터를 불러오는 중입니다.</span>
			</section>
		);
	}

	const {
		categoryNames,
		difficultyLevel,
		exerciseSets,
		name,
		totalExerciseCount,
		totalMinutes,
		imageURL,
	} = routine;

	return (
		<section className="max-w-screen-xl m-auto md:flex gap-x-2">
			<div className="basis-[60%] w-full">
				<div className="flex items-center justify-center text-white bg-black h-80">
					{imageURL ? (
						<Image src={imageURL} alt={name} />
					) : (
						<span className="text-4xl font-bold">{name}</span>
					)}
				</div>
				<div className="flex flex-col gap-1 p-2 mb-4">
					<h1 className="text-2xl font-bold">{name}</h1>
					<span className="text-lg">{`약 ${totalMinutes}분 총 ${totalExerciseCount}개의 운동 `}</span>
					<div className="flex ">
						{Array.from({ length: difficultyLevel }).map((_, flameIndex) => (
							<Flame
								className="-ml-[0.4rem]"
								key={flameIndex}
								fill="#EE3A34"
								color="#EE3A34"
							/>
						))}
					</div>
					<div className="flex gap-1 mt-2">
						{categoryNames.map((categoryName, i) => (
							<Button
								key={categoryName}
								color="secondary"
								borderRadius="full"
								size="xs"
								className="max-w-10"
							>
								{categoryName}
							</Button>
						))}
					</div>
					<Button>시작하기</Button>
				</div>
			</div>
			<div className="basis-[40%] w-full text-center">
				<h2 className="p-2 text-2xl font-bold">운동 구성</h2>
				<ul>
					{exerciseSets.map(
						({ id, name, repetitionCount, restTime, sets, totalTime }) => (
							<li key={id} className="flex flex-col p-2 border-t">
								<span className="font-bold">{name}</span>
								<span>{`총 ${sets}세트`}</span>
								<span>{`반복 횟수 : ${repetitionCount}회`}</span>
								<span>{`운동 시간 : ${totalTime}초`}</span>
								<span>{`휴식 시간 : ${restTime}초`}</span>
							</li>
						)
					)}
				</ul>
			</div>
		</section>
	);
}
