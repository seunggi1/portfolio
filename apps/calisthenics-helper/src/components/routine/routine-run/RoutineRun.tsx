'use client';

import { useRoutine } from '@/hooks';
import RoutineProgress from './RoutineRunner';
import RoutinePrepare from './RoutinePrepare';

type Props = {
	id: string;
};

export default function RoutineRun({ id }: Props) {
	const {
		routineDetail,
		isEnd,
		isPause,
		isPrepare,
		exerciseInfo,
		status,
		onNext,
		onChangeIsPrepare,
		onToggleIsPause,
		onChangeIsEnd,
		initSeconds,
		isLoading,
		error,
	} = useRoutine(id);

	if (isLoading || !routineDetail) {
		return <> 운동 정보를 불러오는 중입니다...</>;
	}

	if (isEnd) {
		return <>운동이 종료되었습니다.</>;
	}

	return (
		<>
			{!isPrepare && (
				<RoutinePrepare
					prepareSeconds={initSeconds!}
					onPrepare={() => onChangeIsPrepare(true)}
				/>
			)}

			{isPrepare && (
				<RoutineProgress
					{...routineDetail}
					{...exerciseInfo}
					isPause={isPause}
					onToggleIsPause={onToggleIsPause}
					onNext={onNext}
					initSeconds={initSeconds}
					onEnd={() => onChangeIsEnd(true)}
					status={status}
				/>
			)}
		</>
	);
}
