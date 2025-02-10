'use client';

import RoutineProgress from './RoutineProgress';
import RoutinePrepare from './RoutinePrepare';
import { useRoutine } from '@/hooks';

type Props = {
	id: string;
};

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

	if (isPrepare) {
		return (
			<RoutinePrepare
				prepareSeconds={5}
				onPrepare={() => onChangeIsPrepare(true)}
			/>
		);
	}

	if (isEnd) {
		return <>운동이 종료되었습니다.</>;
	}

	return (
		<>
			<RoutineProgress
				exerciseSet={routine}
				isPause={isPause}
				onToggleIsPause={onToggleIsPause}
				onNext={onNext}
				onEnd={() => onChangeIsEnd(true)}
				currentSet={currentSet}
				isRest={isRest}
			/>
		</>
	);
}
