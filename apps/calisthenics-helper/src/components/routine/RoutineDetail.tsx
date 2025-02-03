'use client';

import type { RoutineDetail } from '@/types/routine';
import { createHttpClient } from '@/utils/httpClient';
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

	return (
		<section>
			<span>{routine?.id}</span>
		</section>
	);
}
