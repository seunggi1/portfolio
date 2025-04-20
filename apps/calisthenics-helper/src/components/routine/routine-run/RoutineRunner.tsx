'use client';

import RoutineInfo from './RoutineInfo';
import { RoutineDetail } from '@/types/routine';
import { useRoutineRunner } from '@/hooks';
import RoutineProgressBar from './RoutineProgressBar';
import RoutineControl from './RoutineControl';
import RoutineStep from './RoutineStep';
import RoutineEnd from './RoutineEnd';

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
		routineRunStep,
	} = routine;

	return (
		<>
			<section
				className={`flex flex-col items-center justify-center gap-4 h-full`}
			>
				{isEnd ? (
					<RoutineEnd routineID={routineDetail.id} />
				) : (
					<>
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
					</>
				)}

				<RoutineStep routineRunStep={routineRunStep} />
			</section>
		</>
	);
}
