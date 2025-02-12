'use client';

import { useEffect, useState } from 'react';
import RecommandRoutineBanner from './RecommandRoutineBanner';
import CategoryFilterTab from './CategoryFilterTab';
import RoutineCards from './RoutineCards';
import type { Routine } from '@/types/routine';
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
