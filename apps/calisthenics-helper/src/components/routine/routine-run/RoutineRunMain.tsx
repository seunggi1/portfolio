'use client';

import useRoutineDetail from '@/hooks/useRoutineDetail';
import RoutineRunner from './RoutineRunner';

type Props = {
	id: string;
};

export default function RoutineRunMain({ id }: Props) {
	const { isLoading, routineDetail } = useRoutineDetail(id);

	if (isLoading || !routineDetail) {
		return <>운동을 불러오는 중입니다...</>;
	}

	return (
		<>
			<RoutineRunner routineDetail={routineDetail} />
		</>
	);
}
