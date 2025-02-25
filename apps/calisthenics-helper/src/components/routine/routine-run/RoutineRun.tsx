'use client';

import { useRoutine } from '@/hooks';
import RoutineProgress from './RoutineRunner';
import RoutinePrepare from './RoutinePrepare';

type Props = {
	id: string;
};

const PREPARE_SECONDS = 5;

export default function RoutineRun({ id }: Props) {
	const {
		routineDetail,
		exercise,
		isEnd,
		isPause,
		isPrepare,
		currentSet,
		isRest,
		onNext,
		onChangeIsPrepare,
		onToggleIsPause,
		onChangeIsEnd,
		isLoading,
		error,
	} = useRoutine(id);

	if (isLoading || !exercise || !routineDetail) {
		return <> 운동 정보를 불러오는 중입니다...</>;
	}

	if (isEnd) {
		return <>운동이 종료되었습니다.</>;
	}

	return (
		<>
			{!isPrepare && (
				<RoutinePrepare
					prepareSeconds={PREPARE_SECONDS}
					onPrepare={() => onChangeIsPrepare(true)}
				/>
			)}

			{isPrepare && (
				<RoutineProgress
					{...routineDetail}
					execise={exercise}
					isPause={isPause}
					onToggleIsPause={onToggleIsPause}
					onNext={onNext}
					onEnd={() => onChangeIsEnd(true)}
					currentSet={currentSet}
					isRest={isRest}
				/>
			)}
		</>
	);
}
