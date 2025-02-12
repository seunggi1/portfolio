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
		routine,
		isEnd,
		isPause,
		isPrepare,
		currentSet,
		isRest,
		onNext,
		onChangeIsPrepare,
		onToggleIsPause,
		onChangeIsEnd,
	} = useRoutine(id);

	if (!routine) {
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
					exerciseSet={routine}
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
