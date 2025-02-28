'use client';

import { useState } from 'react';
import useRoutineDetail from '@/hooks/useRoutineDetail';
import RoutineRunner from './RoutineRunner';
import RoutinePrepare from './RoutinePrepare';

type Props = {
	id: string;
};

export default function RoutineRunMain({ id }: Props) {
	const { isLoading, routineDetail } = useRoutineDetail(id);
	const [isPrepare, setIsPrepare] = useState<boolean>(false);

	if (isLoading || !routineDetail) {
		return <>운동을 불러오는 중입니다...</>;
	}

	return (
		<>
			{!isPrepare && (
				<RoutinePrepare onPrepareClick={() => setIsPrepare(true)} />
			)}
			{isPrepare && <RoutineRunner routineDetail={routineDetail} />}
		</>
	);
}
