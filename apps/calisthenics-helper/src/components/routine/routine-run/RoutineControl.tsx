import { Button } from '@repo/ui/common';
import { PauseIcon, PlayIcon, StopIcon } from '@/components/common/icon';
import { Volume2, VolumeOff } from 'lucide-react';

type Props = {
	isPause: boolean;
	isMute: boolean;
	onTogglePause: () => void;
	onEnd: () => void;
	onToggleIsMute: () => void;
};

export default function RoutineControl({
	isPause,
	onTogglePause,
	isMute,
	onToggleIsMute,
	onEnd,
}: Props) {
	return (
		<div className="space-x-4">
			<Button onClick={onEnd} color={'error'}>
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
			{isMute ? (
				<Button onClick={onToggleIsMute} color={'warning'}>
					<VolumeOff />
				</Button>
			) : (
				<Button onClick={onToggleIsMute} color={'primary'}>
					<Volume2 />
				</Button>
			)}
		</div>
	);
}
