import { Button } from '@repo/ui/common';
import { PauseIcon, PlayIcon, StopIcon } from '@/components/common/icon';
import { Volume2, VolumeOff } from 'lucide-react';

type Props = {
	isPause: boolean;
	isMute: boolean;
	onPauseToggle: () => void;
	onMuteToggle: () => void;
	onEndClick: () => void;
};

export default function RoutineControl({
	isPause,
	isMute,
	onPauseToggle,
	onMuteToggle,
	onEndClick,
}: Props) {
	return (
		<div className="space-x-4">
			<Button onClick={onEndClick} color={'error'}>
				<StopIcon />
			</Button>
			{isPause ? (
				<Button onClick={onPauseToggle} color={'primary'}>
					<PlayIcon />
				</Button>
			) : (
				<Button onClick={onPauseToggle} color={'warning'}>
					<PauseIcon />
				</Button>
			)}
			{isMute ? (
				<Button onClick={onMuteToggle} color={'warning'}>
					<VolumeOff />
				</Button>
			) : (
				<Button onClick={onMuteToggle} color={'primary'}>
					<Volume2 />
				</Button>
			)}
		</div>
	);
}
