import { Progress } from '@repo/ui/common';
import { Color } from '@repo/ui/types';

type Props = {
	seconds: number;
	maxSeconds: number;
	isPause: boolean;
	isRest: boolean;
};

export default function RoutineProgressBar({
	seconds,
	maxSeconds,
	isPause,
	isRest,
}: Props) {
	const { color, text } = getProgressInfo(isPause, isRest);

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
	isRest: boolean
): {
	text: string;
	color: Color;
} {
	if (isPause) {
		return { text: '정지', color: 'warning' };
	} else if (isRest) {
		return { text: '휴식', color: 'success' };
	} else {
		return { text: '운동', color: 'primary' };
	}
}
