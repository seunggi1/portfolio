import { Button } from '@repo/ui/common';
import { PauseIcon, PlayIcon, StopIcon } from '@/components/common/icon';

type Props = {
	isPause: boolean;
	onTogglePause: () => void;
	onEnd: () => void;
};

export default function RoutineControl({
	isPause,
	onTogglePause,
	onEnd,
}: Props) {
	return (
		<div>
			<Button className="mr-4" onClick={onEnd} color={'error'}>
				<StopIcon />
			</Button>
			{isPause ? (
				<Button onClick={onTogglePause} color={'primary'}>
					<PlayIcon />
				</Button>
			) : (
				<Button onClick={onTogglePause} color={'warning'}>
					<PauseIcon />
				</Button>
			)}
		</div>
	);
}
