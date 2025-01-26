'use client';

import RecommandRoutineBanner from '@/components/routine/RecommandRoutineBanner';
import RoutineList from '@/components/routine/RoutineList';
import { Routine } from '@/types/routine';
import CategoryFilterTab from '@/components/routine/CategoryFilterTab';
import { useEffect, useState } from 'react';

export default function HomePage() {
	const [data, setData] = useState<Routine[]>([]);

	useEffect(() => {
		fetch('/routines/api')
			.then((res) => res.json())
			.then(({ data }) => {
				console.log(data);
				setData(data);
			});
	}, []);

	const categories: string[] = ['전체', '등', '가슴', '다리', '어깨', '전신'];

	return (
		<>
			<RecommandRoutineBanner />
			<CategoryFilterTab categories={categories} />
			<RoutineList routines={data.concat(data.slice(), data.slice())} />
		</>
	);
}
