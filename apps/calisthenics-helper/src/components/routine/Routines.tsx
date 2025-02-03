'use client';

import RecommandRoutineBanner from '@/components/routine/RecommandRoutineBanner';
import RoutineCards from '@/components/routine/RoutineCards';
import { Routine } from '@/types/routine';
import CategoryFilterTab from '@/components/routine/CategoryFilterTab';
import { useEffect, useState } from 'react';
import { createHttpClient } from '@/utils/httpClient';

export default function Routines() {
	const [data, setData] = useState<Routine[]>([]);

	useEffect(() => {
		createHttpClient<Routine[]>('/routines/api').get().then(setData);
	}, []);

	const categories: string[] = ['전체', '등', '가슴', '다리', '어깨', '전신'];

	return (
		<>
			<RecommandRoutineBanner />
			<CategoryFilterTab categories={categories} />
			<RoutineCards routines={data} />
		</>
	);
}
