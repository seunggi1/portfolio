'use client';

import RoutineInfo from './RoutineInfo';
import { RoutineDetail } from '@/types/routine';
import { useRoutineRunner } from '@/hooks';
import RoutineProgressBar from './RoutineProgressBar';
import RoutineControl from './RoutineControl';

type Props = {
	routineDetail: RoutineDetail;
};

export default function RoutineRunner({ routineDetail }: Props) {
	const routine = useRoutineRunner(routineDetail);

	const {
		routineState: { isEnd, isPause, state },
		remainSeconds,
		maxSeconds,
		isMute,
		handleMuteToggle,
		handlePauseToggle,
		handleEnd,
	} = routine;

	if (isEnd) {
		return <>운동이 종료되었습니다.</>;
	}

	return (
		<>
			<section
				className={`flex flex-col items-center justify-center gap-4 h-full`}
			>
				<RoutineInfo state={state} />
				<RoutineProgressBar
					isPause={isPause}
					maxSeconds={maxSeconds}
					seconds={remainSeconds}
					status={state.status}
				/>
				<RoutineControl
					isPause={isPause}
					isMute={isMute}
					onMuteToggle={handleMuteToggle}
					onPauseToggle={handlePauseToggle}
					onEndClick={handleEnd}
				/>
			</section>
		</>
	);
}
