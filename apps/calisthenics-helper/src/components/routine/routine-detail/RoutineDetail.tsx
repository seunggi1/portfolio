'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { type RoutineDetail } from '@/types/routine';
import { createHttpClient } from '@/utils/httpClient';
import { Button } from '@repo/ui/common';
import RoutineSummary from '../ui/RoutineSummary';
import RoutineLevel from '../ui/RoutineLevel';
import RoutineCategories from '../ui/RoutineCategories';
import ExerciseSetDetails from './ExerciseSetDetails';

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
					<RoutineSummary
						name={name}
						totalExerciseCount={totalExerciseCount}
						totalMinutes={totalMinutes}
					/>
					<RoutineLevel level={difficultyLevel} />
					<RoutineCategories categoryNames={categoryNames} />
					<Link href={`/routines/${id}/run`}>
						<Button className="w-full">시작하기</Button>
					</Link>
				</div>
			</div>
			<div className="basis-[40%] w-full text-center">
				<ExerciseSetDetails exerciseSets={exerciseSets} />
			</div>
		</section>
	);
}
