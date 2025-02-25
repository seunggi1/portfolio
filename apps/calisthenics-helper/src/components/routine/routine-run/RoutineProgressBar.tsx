import { RoutineState } from '@/hooks/useRoutine';
import { Progress } from '@repo/ui/common';
import type { Color } from '@repo/ui/types';

type Props = {
	seconds: number;
	maxSeconds: number;
	isPause: boolean;
	status: RoutineState['currentExercise']['status'];
};

export default function RoutineProgressBar({
	seconds,
	maxSeconds,
	isPause,
	status,
}: Props) {
	const { color, text } = getProgressInfo(isPause, status);

	return (
		<Progress
			value={(seconds / maxSeconds) * 100}
			height="2xl"
			color={color}
			progressText={text}
		/>
	);
}

function getProgressInfo(
	isPause: boolean,
	status: Props['status']
): {
	text: string;
	color: Color;
} {
	if (isPause) {
		return { text: '정지', color: 'warning' };
	} else if (status === 'rest') {
		return { text: '휴식', color: 'success' };
	} else if (status === 'exercise') {
		return { text: '운동', color: 'primary' };
	} else {
		return { text: '운동 준비', color: 'primary' };
	}
}
